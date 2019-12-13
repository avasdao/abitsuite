#!/usr/bin/env node

/*******************************************************************************

  API Server Version 1
  --------------------

  Example Call:
  https://api.modenero.com/v1/request?key=12345&limit=15&offset=65

*******************************************************************************/

/*******************************************************************************
 * Setup the console
 */

// display name shown in 'ps' or 'top'
process.title = 'modenero-handler'

/*******************************************************************************
 * Require all helpers
 */

var async   = require('async')
var fs      = require('fs')
var moment  = require('moment')
var winston = require('winston')

var db        = require('./db')
var errors    = require('./errors')
var functions = require('./functions')

/*******************************************************************************
 * Setup all handlers
 */

var hCompliance = require(__dirname + '/handler/compliance')

/*******************************************************************************
 * Setup server
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
            filename: '/secure_fs/logs/handler-' + moment().format('YYYY.MM.DD') 
        })
    ]}
)

/*******************************************************************************
 * Initialize constants
 */

var PORTNUM = 4000

/*******************************************************************************
 * Start processing
 */

async.series([
    function initStep(callback) {
        logger.info('Initializing Handler Server...')

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
            logger.info('Connected to Main Db.')

            callback()
        })
    },
    function initLogsDbStep(callback) {
        db.initLogs(function () {
            // initialization is complete
            logger.info('Connected to Logs Db.')

            callback()
        })
    },
    function setupRoutesStep(callback) {
        // session | init
        app.get('/manager/handler/compliance/test/try', hCompliance.test.try)

        // sms | notify
        // app.get('/v1/sms/notify', sms.notify)
        // app.post('/v1/sms/notify', sms.notify)

        // sms | send
        // app.get('/v1/sms/send/:to', sms.send)

        callback()
    },
    function setupDefaultRouteStep(callback) {
        app.get('*', function (req, res) {
            // build response
            var response = {
                action    : req.params.action,
                errorCode : 501,
                moreInfo  : errors.moreInfo(501, 'Visit https://api.modenero.com for help.')
            }

            // send error response
            functions.jsonResponse(req, res, response)
        })

        callback()
    },
    function startWebServerStep(callback) {
        // start web server
        http.listen(PORTNUM, function () {
            logger.info('Handler Server is running... [ Port ' + 
                http.address().port + ' ]')
        })

        callback()
    },
    function finalizeStep(callback) {
        console.log('all done.')

        callback()
    }
])
