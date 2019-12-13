#!/usr/bin/env node

/*******************************************************************************
 * Setup the console
 */

// display name shown in 'ps' or 'top'
process.title = 'modenero-manager'

/*******************************************************************************
 * Require all helpers
 */

var async          = require('async')
var bodyParser     = require('body-parser')
var cookieParser   = require('cookie-parser')
var expressSession = require('express-session')
var flash          = require('connect-flash')
var fs             = require('fs')
var moment         = require('moment')
var uuid           = require('node-uuid')
var passwordless   = require('passwordless')
var pwMongo        = require('passwordless-mongostore')
var numeral        = require('numeral')
var winston        = require('winston')

var db        = require('./db')
var errors    = require('./errors')
var functions = require('./functions')

var shared = require('./routes/shared')

/*******************************************************************************
 * Setup all routes
 */

var rMain      = require(__dirname + '/routes/dashboards')
var rConcierge = require(__dirname + '/routes/concierge')

/*******************************************************************************
 * Setup all sockets
 */

// var sSoclBit = require(__dirname + '/../sockets/toa')

/*******************************************************************************
 * Setup web and socket servers
 */

var express = require('express'),
    app     = express(),
    http    = require('http').createServer(app)

/*******************************************************************************
 * Setup logging
 */

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ colorize: 'true'}),
        new (winston.transports.File)({ 
            filename: '/secure_fs/logs/' + moment().format('YYYY.MM.DD') 
        })
    ]}
)

/*******************************************************************************
 * Initialize constants
 */

var PORTNUM = 3000

/*******************************************************************************
 * Start processing
 */

async.series([
    function initStep(callback) {
        logger.info('Initializing Manager Server...')

        // set the view engine
        app.set('view engine', 'ejs')

        // standard express setup
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(cookieParser())
        // app.use(expressSession({ secret: '42', saveUninitialized: false, resave: false }))
        app.use(expressSession({ secure: true, secret: uuid.v4(), saveUninitialized: false, resave: false }))
        app.use(flash())

        // set locale (on every request), if session locale exists
        // otherwise use default browser setting
        app.use(function (req, res, next) {
            // add logger to response object
            res.logger = logger

            next()
        })

        callback()
    },
    function initMainDbStep(callback) {
        db.initMain(function () {
            // initialization is complete
            logger.info('Connected to Main Db')

            callback()
        })
    },
    function initConciergeDbStep(callback) {
        db.initConcierge(function () {
            // initialization is complete
            logger.info('Connected to Concierge Db')

            callback()
        })
    },
    function initModeneroDbStep(callback) {
        db.initModenero(function () {
            // initialization is complete
            logger.info('Connected to Modenero Db')

            callback()
        })
    },
    function initPasswordlessDbStep(callback) {
        var mongoUri = 'mongodb://127.0.0.1/passwordless'
        
        passwordless.init(new pwMongo(mongoUri, {
            server: {
                auto_reconnect: true
            },
            mongostore: {
                collection: 'tokens'
            }
        }),
            { allowTokenReuse: true }
        )

        passwordless.addDelivery(
            function (tokenToSend, uidToSend, recipient, callback) {
                var mailer = require('./mailer')

                var authLink = 'https://modenero.com/manager/?token=' + tokenToSend + '&uid=' + uidToSend

// send sms notification
sendSMS('Manager Auth by ' + uidToSend)
console.log('authLink', authLink)
// return callback(null)
                var subject  = 'Modenero Manager Authorization'
                var message  = 'Click on the link\n' + authLink

                // add a new session to modenero
                addSession(tokenToSend, uidToSend, function (err) {
                    if (err) return callback(err)

                    // send auth link via email
                    // mailer.send(recipient, subject, message, function () {
                    //     callback(null)
                    // })
                })

                // send auth link via email
                mailer.send(recipient, subject, message, function () {
                    callback(null)
                })
            }, {
                tokenAlgorithm: function() {
                    return uuid.v4()
                },
                ttl: 1000 * 60 * 2      // default to 2 minutes
            }
        )

        callback()
    },
    function initPasswordlessAppStep(callback) {
        // passwordless middleware
        app.use(passwordless.sessionSupport())
        // app.use(passwordless.acceptToken({ successRedirect: '/manager' }))
        app.use(passwordless.acceptToken())

        callback()
    },
    function setupRoutesStep(callback) {
        // Dashboard | Index
        app.get('/manager', passwordless.restricted({
            originField: 'origin', failureRedirect: '/manager/signin'
        }), rMain.index)

        // Concierge | Cashboxes
        app.get('/manager/concierge/cashboxes/*', passwordless.restricted({
            originField: 'origin', failureRedirect: '/manager/signin'
        }), rConcierge.cashboxes.index)
        // Concierge | Customers
        app.get('/manager/concierge/customers/*', passwordless.restricted({
            originField: 'origin', failureRedirect: '/manager/signin'
        }), rConcierge.customers.index)
        // Concierge | Transactions
        app.get('/manager/concierge/transactions/*', passwordless.restricted({
            originField: 'origin', failureRedirect: '/manager/signin'
        }), rConcierge.transactions.index)

        app.get('/manager/acm/*', function (req, res) {
            if (req.params[0]) {
                deviceId = functions.sqliFilter(req.params[0]).slice(0, 16)
            } else {
                deviceId = ''
            }

            // add log entry
            var sql = 'SELECT title FROM ' +
                      'sp_device_byid ($deviceid)'
            db.query('connConcierge', sql, {
                $deviceid : deviceId
            }, function (err, rs) {
                if (err) {
                    res.logger.error(err);

                    // show page not found (404)
                    return shared.pageNotFound(req, res)
                }

                if (rs.length) {
                    var title = rs[0].title.toString()

                    res.render(shared.baseDir + 'acm', { 
                        pageTitle : 'Modenero Manager :. ACM',
                        user      : req.user,
                        nickname  : req.nickname ? req.nickname : 'Incognito',
                        deviceId  : deviceId,
                        title     : title
                    })
                } else {
                    // show page not found (404)
                    shared.pageNotFound(req, res)
                }
            })
        })

        // sign in page
        app.get('/manager/signin', function (req, res) {
            res.render(shared.baseDir + 'signin', { 
                pageTitle : 'Modenero Manager :. Sign In',
                origin    : '/manager',
                successes : req.flash('passwordless-success'),
                errors    : req.flash('passwordless')
            })
        })

        // sign in handler
        app.post('/manager/signin', 
            passwordless.requestToken(
                function (user, delivery, callback, req) {
                    shared.getProfile(user, function (err, profile) {
                        if (err) return callback(null, null)

                        callback(null, user)
                    })
                }, {
                    originField     : 'origin',
                    failureRedirect : '/manager/signin',
                    successFlash    : 'Authorization Link sent successfully!<br>It is safe to close this window.',
                    failureFlash    : 'This user is unknown!<br>Please try your request again.'
                }
            ),
            function (req, res) {
                res.redirect('/manager/signin')
            }
        )

        app.get('/manager/signout', passwordless.logout({
            successFlash: 'Thanks for using Modenero Manager!<br>Hope to see you again soon...'
        }), function (req, res) {
                res.redirect('/manager')
            }
        )

        app.use(express.static(__dirname + '/public'))

        // setup all content pages
        app.get('*', function (req, res) {
            var filename = req.url.slice(1)

            fs.exists(shared.baseDir + filename + '.ejs', function (exists) {
                if (exists) {
                    shared.getProfile(req.user, function (err, profile) {
                        res.render(shared.baseDir + filename, { 
                            pageTitle : 'Modenero Manager :. New Money Beginnings™',
                            profile   : profile
                        })
                    })
                } else {
                    // show page not found (404)
                    shared.pageNotFound(req, res)
                }
            })
        })

        callback()
    },
    function startWebServerStep(callback) {
        // start web server
        var server = http.listen(PORTNUM, function () {
            logger.info('Manager Server is running... [ Port ' + 
                server.address().port + ' ]')
        })

        callback()
    },
    function finalizeStep(callback) {
        console.log('all done.')

        callback()
    }
])

var sendSMS = function (msg) {
    var request = require('request')

    var phone = '14048248743'
    var url   = 'https://api.kewllife.com/v1/sms/send/' + 
              phone + 
              '?msg=' + encodeURIComponent(msg)

    request(url, function (error, response, body) {
        if (error) {
            console.log(error)
        }
    })
}

var addSession = function (sessionId, email, callback) {
console.log('adding new session for ', email, sessionId)
    // lookup profile id
    var sql = 'SELECT profileid FROM ' +
              'sp_session_add ($sessionid, $email)'
    db.query('connModenero', sql, {
        $sessionid : sessionId,
        $email     : email
    }, function (err, rs) {
        if (err) return callback(err)

        if (rs.length) {
            var profileId = parseInt(rs[0].profileId)
console.log('PROFILEID', profileId)

            // return profile id
            callback(null, profileId)
        } else {
            console.log('NO PROFILE FOUND FOR EMAIL', email)

            callback('NO PROFILE FOUND FOR EMAIL')
        }
    })
}
