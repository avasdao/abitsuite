var async   = require('async')
var plivo   = require('plivo')
var request = require('request')
var qs      = require('qs')
var uuid    = require('uuid')

var db        = require('../db')
var errors    = require('../errors')
var functions = require('../functions')

exports.getSanctionsList = function (pkg, callback) {
    var blockscore = require('blockscore')('sk_test_f46bc80e36857b186ec2f3733b8665d7')

    blockscore.candidates.list({
        // count: 5
    }, callback)
}

exports.call_auth = function (apiKey, deviceId, pkg, callback) {
    // initialize variables
    var errorCode = 0
    var moreInfo  = ''

    // retrieve the phone number
    var phone = functions.sqliFilter(pkg.phone)

    // send the auth code via sms
    callCode(apiKey, deviceId, phone, function (err, response) {
        if (err) return callback(err)

        // build log package
        var pkg = {
            response  : response,
            errorCode : errorCode,
            moreInfo  : moreInfo
        }

        return callback(pkg)
    })
}

exports.verify_code = function (apiKey, deviceId, pkg, callback) {
    // initialize variables
    var errorCode = 0
    var moreInfo  = ''

    // retrieve the phone number
    var phone = functions.sqliFilter(pkg.phone)
console.log('[Verify Code] Phone', phone)
    // retrieve the auth code
    // var authCode = functions.sqliFilter(req.query.authCode)
    var authCode = functions.sqliFilter(pkg.authCode)

    // authorize the api key
    functions.apiAuth(apiKey, db, function (err, profileId) {
        var sql = 'SELECT success FROM ' +
                  'sp_customer_auth_sms ($phone, $authcode)'
        db.query('connConcierge', sql, {
            $phone    : phone,
            $authcode : authCode
        }, function (err, rs) {
            if (err) return callback(err)

            if (rs.length) {
                var success = parseInt(rs[0].success)

                // build log package
                var pkg = {
                    success   : success,
                    errorCode : errorCode,
                    moreInfo  : moreInfo
                }

                return callback(pkg)
            } else {
                errorCode = 404
                moreInfo  = 'No results not found'

                // build log package
                var pkg = {
                    success   : 0,
                    errorCode : errorCode,
                    moreInfo  : moreInfo
                }

                return callback(pkg)
            }
        })
    })
}

