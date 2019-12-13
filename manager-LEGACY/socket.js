#!/usr/bin/env node

/*******************************************************************************
 * Setup the console
 */

// display name shown in 'ps' or 'top'
process.title = 'api-socket';

/*******************************************************************************
 * Require all helpers
 */

var async   = require('async')

var app     = require('express')()
var http    = require('http').Server(app)
var io      = require('socket.io')(http)
var moment  = require('moment')
var numeral = require('numeral')
var plivo   = require('plivo')
var qs      = require('qs')
var request = require('request')

var db        = require('./db')
var errors    = require('./errors')
var functions = require('./functions')

const PORTNUM = 8080

// var admin     = io.of('/v1/admin')
// var concierge = io.of('/v1/concierge')
// var modenero  = io.of('/v1/modenero')

// function Device(clientid, deviceId, socket) {
//     this.id       = clientid
//     this.deviceId = deviceId
//     this.socket   = socket
// }

/*******************************************************************************

  Initialize Concierge Sockets

*******************************************************************************/

// admin
// var sAdmin       = require(__dirname + '/sockets/concierge/admin')
// cashbox
// var sCashbox     = require(__dirname + '/sockets/concierge/cashbox')
// compliance
var sCompliance  = require(__dirname + '/sockets/compliance')
// log
// var sLog         = require(__dirname + '/sockets/concierge/log')
// modenero
// var sModenero    = require(__dirname + '/sockets/concierge/modenero')
// session
// var sSession     = require(__dirname + '/sockets/concierge/session')
// status
// var sStatus      = require(__dirname + '/sockets/concierge/status')
// transaction
// var sTransaction = require(__dirname + '/sockets/concierge/transaction')

/*******************************************************************************

  Initialize Modenero Sockets

*******************************************************************************/

// auth
// var sAuth = require(__dirname + '/sockets/modenero/auth')

/*******************************************************************************

  Initialize Privy Sockets

*******************************************************************************/

// concierge
// var sConcierge = require(__dirname + '/sockets/admin/concierge')


// initialize clients
// var clients = []

// initialize devices
// var devices = []

// initialize socket processing
// var socketProcessing = []
// var adminProcessing = []
// var conciergeProcessing = []
// var modeneroProcessing = []

// initialize sockets
// var sockets = []

// PROCESS_INTERVAL = 500

// var socketProcess = function () {
//     // console.log('processing socketProcess')
// }
// setInterval (socketProcess, PROCESS_INTERVAL)

// var adminProcess = function () {
//     // console.log('processing adminProcess')
// }
// setInterval (adminProcess, PROCESS_INTERVAL)
// 
// var conciergeProcess = function () {
//     // console.log('processing conciergeProcess ', conciergeProcessing.length)

//     if (conciergeProcessing.length == 0)
//         return

//     var exec = conciergeProcessing.shift()

//     var apiKey = exec.apiKey
//     var deviceId = exec.deviceId
//     var cmd = exec.cmd
//     var pkg = exec.pkg
//     var socket = exec.socket

//     switch(cmd) {
//         case 'admin_notify':
//             sAdmin.notify(apiKey, deviceId, pkg, function(response) {
//                 console.log('admin_notify', response)
                
//                 response['cmd'] = cmd

//                 socket.emit('msg', response)
//             })

//             break
//         case 'cashbox_add':
//             sCashbox.add(apiKey, deviceId, pkg, function(response) {
//                 console.log('cashbox_add', response)

//                 response['cmd'] = cmd

//                 socket.emit('msg', response)
//             })

//             break
//         case 'cashbox_new':
//             sCashbox.new(apiKey, deviceId, pkg, function(response) {
//                 console.log('cashbox_new', response)

//                 response['cmd'] = cmd

//                 socket.emit('msg', response)
//             })

//             break
//         case 'compliance_send_auth':
//             sCompliance.send_auth(apiKey, deviceId, pkg, function(response) {
//                 console.log('compliance_send_auth', response)

//                 response['cmd'] = cmd

//                 socket.emit('msg', response)
//             })

//             break
//         case 'compliance_call_auth':
//             sCompliance.call_auth(apiKey, deviceId, pkg, function(response) {
//                 console.log('compliance_auth_auth', response)

//                 response['cmd'] = cmd

//                 socket.emit('msg', response)
//             })

//             break
//         case 'compliance_verify_code':
//             sCompliance.verify_code(apiKey, deviceId, pkg, function(response) {
//                 console.log('compliance_verify_code', response)

//                 response['cmd'] = cmd

//                 socket.emit('msg', response)
//             })

//             break
//         case 'log_action':
//             sLog.action(deviceId, pkg, function(response) {
//                 console.log('log_action', response)
                
//                 response['cmd'] = cmd

//                 socket.emit('msg', response)
//                 admin.emit('msg', response)
//             })

//             break
//         case 'log_error':
//             sLog.error(deviceId, pkg, function(response) {
//                 console.log('log_error', response)
                
//                 response['cmd'] = cmd

//                 socket.emit('msg', response)
//                 admin.emit('msg', response)
//             })

//             break
//         case 'modenero_spot_quotes':
//             sModenero.spot_quotes(apiKey, deviceId, pkg, function(response) {
//                 console.log('modenero_spot_quotes', response)

//                 response['cmd'] = cmd

//                 socket.emit('msg', response)
//             })

//             break
//         case 'report_acceptor_status':
//             pkg['cmd']      = cmd
//             pkg['deviceId'] = deviceId

//             admin.emit('msg', pkg)

//             break
//         case 'session_init':
//             sSession.init(deviceId, cmd, pkg, function(response) {
//                 console.log('session_init', response)
                
//                 response['cmd'] = cmd

//                 socket.emit('msg', response)
//                 admin.emit('msg', response)
//             })

//             break
//         case 'session_update':
//             sSession.update(deviceId, cmd, pkg, function(response) {
//                 console.log('session_update', response)
                
//                 response['cmd'] = cmd

//                 socket.emit('msg', response)
//                 admin.emit('msg', response)
//             })

//             break
//         case 'status_device_balances':
//             sStatus.device_balances(deviceId, cmd, function(response) {
//                 console.log('status_device_balances', response)

//                 response['cmd'] = cmd

//                 socket.emit('msg', response)
//             })

//             break
//         case 'status_device_rates':
//             sStatus.device_rates(deviceId, cmd, function(response) {
//                 console.log('status_device_rates', response)

//                 response['cmd'] = cmd

//                 socket.emit('msg', response)
//             })

//             break
//         case 'status_support_contact':
//             sStatus.support_contact(deviceId, cmd, function(contact) {
//                 console.log('status_support_contact', contact)
                
//                 var pkg = {
//                     cmd     : cmd,
//                     contact : contact
//                 }

//                 socket.emit('msg', pkg)
//             })

//             break
//         case 'transaction_send':
//             sTransaction.send(apiKey, deviceId, pkg, function(response) {
//                 console.log('transaction_send', response)
                
//                 response['cmd'] = cmd

//                 socket.emit('msg', response)
//                 admin.emit('msg', response)
//             })

//             break
//         default:
//             console.log('WARNING: [ ' + cmd + ' ] not found in selection')
//     }
// }
// setInterval (conciergeProcess, PROCESS_INTERVAL)

// var modeneroProcess = function() {
//     // console.log('processing modeneroProcess')
// }
// setInterval (modeneroProcess, PROCESS_INTERVAL)

async.series([
    function initMainDbStep(callback) {
        db.initMain(function () {
            // initialization is complete
            console.log('Connected to Main Db.')

            callback()
        })
    },
    function initConciergeDbStep(callback) {
        db.initConcierge(function () {
            // initialization is complete
            console.log('Connected to Concierge Db.')

            callback()
        })
    },
    function initModeneroDbStep(callback) {
        db.initModenero(function () {
            // initialization is complete
            console.log('Connected to Modenero Db.')

            callback()
        })
    },
    function initLogsDbStep(callback) {
        db.initLogs(function () {
            // initialization is complete
            console.log('Connected to Logs Db.')

            callback()
        })
    },
    function finalizeStep(callback) {
        console.log('all done.')

        callback()
    }
])

io.on('connection', function(socket) {
    console.log('connected...')

    socket.on('get-dashboard', function (pkg, callback) {
        console.log('get-dashboard')
        console.log('pkg', pkg)

        getDashboard(pkg.sessionId, function(err, data) {
            if (err) return callback(err)

            callback(null, data)
        })
    })

    socket.on('phone-search', function (pkg, callback) {
        console.log('pkg', pkg)
        // console.log('callback', callback)

        telo(pkg, function(err, data) {
            if (err) return callback(err)

console.log('data', data)
            callback(null, data)
        })
    })

    socket.on('sanctions-search', function (pkg, callback) {
        console.log('pkg', pkg)
        // console.log('callback', callback)

        blockScore(pkg, function(err, data) {
            if (err) return callback(err)

console.log('data', data)
            callback(null, data)
        })
    })

    socket.on('sanctions-list', function (pkg, callback) {
        console.log('pkg', pkg)
        // console.log('callback', callback)

        sCompliance.getSanctionsList(pkg, function(err, data) {
            if (err) return callback(err)

console.log('data', data)
            callback(null, data)
        })
    })

    socket.on('send-sms', function (pkg, callback) {
        console.log('pkg', pkg)

        var sql = 'SELECT did FROM ' +
                  'sp_did_byid ($deviceid)';
        db.query('connConcierge', sql, {
            $deviceid : pkg.deviceId
        }, function (err, rs) {
            if (err) return callback(err)

            var did = rs[0].did.toString()

            if (!did) return callback('No DID Found.')

            sendSms(did, pkg.to, pkg.body, function(data) {
                callback(null, data)
            })
        })
    })

    socket.on('get-customers', function (pkg, callback) {
        console.log('pkg', pkg)

        getCustomers(pkg.deviceId, pkg.start, pkg.end, function(err, data) {
            if (err) return callback(err)

            callback(null, data)
        })
    })

})

// tele phone search
var telo = function (phone, callback) {
    var ACCOUNT_SID   = 'ACccba7427d97f4271b90a3a8539141cfa'
    var ACCOUNT_TOKEN = 'AUc65d538d05a54ab5996dda3042167ead'

    var query = {
        'account_sid' : ACCOUNT_SID,
        'auth_token'  : ACCOUNT_TOKEN,
        'pretty'      : 'true'
    }

    var url = 'https://api.everyoneapi.com/v1/phone/' + 
              phone + '?' + 
              qs.stringify(query)

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body)

            // var entry = JSON.parse(body)

            callback(null, body)
        } else {
            var entry = {
                failed : 1
            }

            callback(entry)
        }
    })
}

var blockScore = function (customer, callback) {
    // var blockscore = require('blockscore')('sk_live_1e313320a47ddf6e09880433a97f37bb')
    var blockscore = require('blockscore')('sk_test_f46bc80e36857b186ec2f3733b8665d7')

    blockscore.people.list({
        count: 5
    }, callback)

    // var result = {
    //     success: true
    // }

    // callback(null, result)
}

var sendSms = function (from, to, text, callback) {
    var p = plivo.RestAPI({
        authId    : 'MAODHIZJU3NZY1YWZMYT',
        authToken : 'NTNhMmQ0ZmYwYzVjNzI1YzE2MWQ4MDRmNmY1MjAz'
    })

    var params = {
        src    : from,
        dst    : to,
        text   : text,
        url    : 'https://api.kewllife.com/v1/concierge/sms/notify', // The URL to which with the status of the message is sent
        method : 'GET'
    }

    // Prints the complete response
    p.send_message(params, function (status, response) {
        // console.log('Status: ', status)
        // console.log('API Response:\n', response)

        // build log entry
        var entry = {
            status    : status,
            response  : response
        }

        return callback(entry)
    })
}

var getDashboard = function (sessionId, callback) {
    var dashboard = {}
    var profileId = 0
    var recentCredits = []
    var recentDebits = []

    async.series([
        function firstStep(callback) {
            var sql = 'SELECT profileid, usd FROM ' +
                      'sp_dashboard_bysession ($sessionid)'
            db.query('connModenero', sql, {
                $sessionid : sessionId
            }, function (err, rs) {
                if (err) return callback(err)

                profileId          = parseInt(rs[0].profileid)
                var usd          = parseFloat(rs[0].usd)
                    // var phone       = rs[i].phone ? rs[i].phone.toString() : null
                    // var numSessions = parseInt(rs[i].numsessions)
                    // var totalSpent  = parseFloat(rs[i].totalspent)
                    // // var lastSession = moment(rs[i].lastsession).format()
                    // var lastSession = moment(rs[i].lastsession).fromNow()

                dashboard.usd = usd

                callback(null)
            })
        },
        function secondStep(callback) {
            var sql = 'SELECT FIRST(5) amount, referenceid FROM ' +
                      'sp_transactions_byid ($profileid) WHERE ' +
                      'currencyid = 1 AND ' +
                      'amount > 0'
            db.query('connModenero', sql, {
                $profileid : profileId
            }, function (err, rs) {
                if (err) return callback(err)

                for (var i = 0; i < rs.length; i++) {
                    var amount      = parseFloat(rs[i].amount)
                    var referenceId = rs[i].referenceid.toString()

                    recentCredits[i] = {
                        amount      : amount,
                        referenceId : referenceId
                    }

                }
                    // var phone       = rs[i].phone ? rs[i].phone.toString() : null
                    // var numSessions = parseInt(rs[i].numsessions)
                    // var totalSpent  = parseFloat(rs[i].totalspent)
                    // // var lastSession = moment(rs[i].lastsession).format()
                    // var lastSession = moment(rs[i].lastsession).fromNow()

                dashboard.recentCredits = recentCredits

                callback(null)
            })
        },
        function secondStep() {
            var sql = 'SELECT FIRST(5) amount, referenceid FROM ' +
                      'sp_transactions_byid ($profileid) WHERE ' +
                      'currencyid = 1 AND ' +
                      'amount < 0'
            db.query('connModenero', sql, {
                $profileid : profileId
            }, function (err, rs) {
                if (err) return callback(err)

                for (var i = 0; i < rs.length; i++) {
                    var amount      = parseFloat(rs[i].amount)
                    var referenceId = rs[i].referenceid.toString()

                    recentDebits[i] = {
                        amount      : amount,
                        referenceId : referenceId
                    }

                }
                    // var phone       = rs[i].phone ? rs[i].phone.toString() : null
                    // var numSessions = parseInt(rs[i].numsessions)
                    // var totalSpent  = parseFloat(rs[i].totalspent)
                    // // var lastSession = moment(rs[i].lastsession).format()
                    // var lastSession = moment(rs[i].lastsession).fromNow()

                dashboard.recentDebits = recentDebits

                callback(null, dashboard)
            })
        }
    ])
}

var getPerson = function () {
    blockscore.people.create({
      name_first: "John",
      name_last: "Doe",
      birth_year: '1993',
      birth_month: '01',
      birth_day: '13',
      document_type: "ssn",
      document_value: "0000",
      address_street1: "3515 Woodridge Lane",
      address_city: "Memphis",
      address_subdivision: "TN",
      address_postal_code: "38115",
      address_country_code: "US"
    }, callback)
}

var getCustomers = function (deviceId, start, end, callback) {
    var sql = 'SELECT FIRST (' + (end - start) + ') SKIP (' + start + ') ' +
              'customerid, phone, numsessions, totalspent, lastsession FROM ' +
              'sp_customers_bydevice ($deviceid) ' +
              'ORDER BY totalspent DESC'
    db.query('connConcierge', sql, {
        $deviceid : deviceId
    }, function (err, rs) {
        if (err) return callback(err)

        var customers = []

        for (var i = 0; i < rs.length; i++) {
            var id          = parseFloat(rs[i].customerid)
            var phone       = rs[i].phone ? rs[i].phone.toString() : null
            var numSessions = parseInt(rs[i].numsessions)
            var totalSpent  = parseFloat(rs[i].totalspent)
            // var lastSession = moment(rs[i].lastsession).format()
            var lastSession = moment(rs[i].lastsession).fromNow()

            var customer = {
                id          : id,
                phone       : phone,
                numSessions : numSessions,
                totalSpent  : totalSpent,
                lastSession : lastSession
            }

            customers[i] = customer
        }

        callback(null, customers)
    })
}


// admin.on('connection', function (socket) {
//     // send welcome message
//     socket.emit('msg', 'Welcome to Admin Socket Services...')

//     // retreive socket id
//     var clientid = socket.conn.id
//     console.log('[ %s ] connected to Admin', clientid)

//     // retrieve socket handshake
//     var handshake = socket.handshake

//     var apiKey   = ''
//     var deviceId = ''

//     socket.on('msg', function (pkg) {
//         console.log('package [ %s ] [ %s ]', pkg, typeof pkg)

//         // if (typeof pkg !== undefined) {
//         //     console.log('this is an object, ', typeof pkg)
//         //     return
//         // }

//         // attempt to parse the package as json
//         try {
//             var pkg = JSON.parse(pkg)

//             var cmd = pkg['cmd']
//         } catch(e) {
//             var cmd = pkg
//         }
// console.log('command is', cmd)

//         switch(cmd) {
//             case 'connected_clients':
//                 console.log('connected_clients')
                
//                 var pkg = {
//                     cmd     : cmd,
//                     clients : JSON.stringify(clients)
//                 }

//                 socket.emit('msg', pkg)

//                 break

//             case 'connected_devices':
//                 console.log('connected_devices')
                
//                 var pkgDevices = []

//                 for (var i = 0; i < devices.length; i++) {
//                     var device = {
//                         id       : devices[i].id,
//                         deviceId : devices[i].deviceId
//                     }

//                     pkgDevices.push(device)
//                 }

//                 var pkg = {
//                     cmd     : cmd,
//                     devices : JSON.stringify(pkgDevices)
//                 }

//                 socket.emit('msg', pkg)

//                 break

//             case 'admin_cmd':
//                 for (var i = 0; i < devices.length; i++) {
//                     console.log('devices[i].deviceId', devices[i].deviceId)
//                     if (pkg.deviceId == devices[i].deviceId) {
//                         devices[i].socket.emit('msg', pkg)
//                     }
//                 }

//                 break

//             default:
//                 console.log('WARNING: [ ' + cmd + ' ] not found in selection')
//         }
//     })

//     socket.on('secure_msg', function (msg) {
//         console.log('secure msg', msg)
//         socket.emit('secure_msg', { msg: 'secure echo: ' + msg })
//     })

//     socket.on('disconnect', function () {
//         console.log('[ %s ] disconnected from Admin', clientid)

//         // remove this client from the connected list
//         // clients.removeById(clientid)
    
//         // io.emit('a user disconnected');
//     })
// })

// concierge.on('connection', function (socket) {
//     // send welcome message
//     socket.emit('msg', 'Welcome to Concierge Socket Services...')

//     // retreive socket id
//     var clientid = socket.conn.id
//     console.log('[ %s ] connected to Concierge', clientid)

//     // retrieve socket handshake
//     var handshake = socket.handshake

//     var apiKey = handshake['headers']['x-kl-apikey']
//     var deviceId = handshake['headers']['x-concierge-deviceid']

//     var realIp       = handshake['headers']['x-real-ip'],
//         forwardedFor = handshake['headers']['x-forwarded-for'],
//         ipAddress    = forwardedFor.split(',')[0]
//     var country      = handshake['headers']['cf-ipcountry']
//     var userAgent    = handshake['headers']['user-agent']

//     // initialize new client
//     var client = {
//         id       : clientid,
//         apiKey   : apiKey,
//         deviceId : deviceId
//     }
//     clients.push(client)

//     console.log('API Key', apiKey)
//     console.log('Device Id', deviceId)

//     var device = new Device(clientid, deviceId, socket)
//     devices.push(device)

//     console.log('IP Address / Agent [ %s ] [ %s ]', ipAddress, userAgent)

//     // notify administrators
//     admin.emit('msg', 'New device has connected [' + clientid + '] [' + deviceId + ']')

//     socket.emit('msg', 'You are connected as [' + clientid + ']')

//     // request('http://ipinfo.io/' + ipAddress, function (error, response, body) {
//     //     if (!error && response.statusCode == 200) {
//     //         var data = JSON.parse(body)

//     //         var city     = data.city
//     //         var region   = data.region
//     //         var country  = data.country
//     //         var hostname = data.hostname

//     //         console.log('City     : ', city)
//     //         console.log('Region   : ', region)
//     //         console.log('Country  : ', country)
//     //         console.log('Hostname : ', hostname)
//     //     } else {
//     //         console.log('error', error)
//     //     }
//     // })

//     socket.on('msg', function (pkg) {
//         console.log('package [ %s ] from [ %s ]', pkg, deviceId)

//         // if (typeof pkg !== undefined) {
//         //     console.log('this is an object, ', typeof pkg)
//         //     return
//         // }

//         // attempt to parse the package as json
//         try {
//             var pkg = JSON.parse(pkg)

//             var cmd = pkg['cmd']
//         } catch(e) {
//             var cmd = pkg
//         }

//         var exec = {
//             id       : clientid,
//             apiKey   : apiKey,
//             deviceId : deviceId,
//             cmd : cmd,
//             pkg : pkg,
//             socket : socket
//         }

//         conciergeProcessing.push(exec)
// // console.log('command is', cmd)

// // TODO: Verify API key for proper authentication


//         // socket.emit('msg', { msg: 'you said: ' + msg })

//         // concierge.emit('broadcast_msg', 'quiet! someone is talking')

//     })

//     socket.on('secure_msg', function (msg) {
//         console.log('secure msg', msg)
//         socket.emit('secure_msg', { msg: 'secure echo: ' + msg })
//     })

//     socket.on('disconnect', function () {
//         console.log('[ %s ] [ %s ] disconnected from Concierge', clientid, deviceId)

//         // alert admin that client disconnected
//         admin.emit('msg', clientid + ' [ ' + deviceId + ' ] disconnected from Concierge')

//         // remove this client from the clients array
//         clients.removeById(clientid)

//         // remove this device from the devices array
//         devices.removeById(clientid)
//     })
// })

// modenero.on('connection', function (socket) {
//     // send welcome message
//     socket.emit('msg', 'Welcome to Modenero Socket Services...')

//     // retreive socket id
//     var clientid = socket.conn.id
//     console.log('[ %s ] connected to Modenero', clientid)

//     // retrieve socket handshake
//     var handshake = socket.handshake

//     socket.on('msg', function (pkg) {
//         console.log('package [ %s ] [ %s ]', pkg, typeof pkg)

//         // if (typeof pkg !== undefined) {
//         //     console.log('this is an object, ', typeof pkg)
//         //     return
//         // }

//         // attempt to parse the package as json
//         try {
//             var pkg = JSON.parse(pkg)

//             var cmd = pkg['cmd']
//         } catch(e) {
//             var cmd = pkg
//         }
// console.log('command is', cmd)

//         switch(cmd) {
//             case 'some_function':
//                 console.log('some_function')
                
//                 var pkg = {
//                     cmd     : cmd,
//                     clients : JSON.stringify(clients)
//                 }

//                 socket.emit('msg', pkg)

//                 break

//             default:
//                 console.log('WARNING: [ ' + cmd + ' ] not found in selection')
//         }
//     })

//     socket.on('secure_msg', function (msg) {
//         console.log('secure msg', msg)
//         socket.emit('secure_msg', { msg: 'secure echo: ' + msg })
//     })

//     socket.on('disconnect', function () {
//         console.log('[ %s ] disconnected from Modenero', clientid)

//         // remove this client from the connected list
//         clients.removeById(clientid)
    
//         // io.emit('a user disconnected');
//     })
// })

// start listening
http.listen(PORTNUM, function() {
    console.log('listening on *:' + PORTNUM)
})
