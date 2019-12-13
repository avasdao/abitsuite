var async   = require('async')
var moment  = require('moment')
var numeral = require('numeral')

var db        = require('../../db')
var errors    = require('../../errors')
var functions = require('../../functions')

var shared = require('../shared')

// initialize default (catch-all)
exports.index = function(req, res) {
    shared.getProfile(req.user, function (err, profile) {
        if (err) return shared.pageNotFound(req, res)

        var device       = {}
        var deviceBalUsd = 0
        var cashboxBal   = 0
        var numNotes     = 0
        var summary7     = {}
        var cashboxes    = []

        // retreive device id
        if (req.params[0]) {
            deviceId  = functions.sqliFilter(req.params[0]).slice(0, 16)
            device.id = deviceId
        } else {
            deviceId  = ''
            device.id = ''
        }

        async.series([
            function getDeviceInfo(callback) {
                // lookup device name
                var sql = 'SELECT title, code, rate_buy, rate_sell FROM ' +
                          'sp_device_byid ($deviceid)'
                db.query('connConcierge', sql, {
                    $deviceid : deviceId
                }, function (err, rs) {
                    if (err) return callback(err)

                    if (rs.length) {
                        device.title    = rs[0].title.toString()
                        device.code     = rs[0].code.toString()
                        device.rateBuy  = parseFloat(rs[0].rate_buy)
                        device.rateSell = parseFloat(rs[0].rate_sell)

                        // move to next device id
                        callback()
                    } else {
console.log('No device info available', deviceId)
                        callback('No device info available')
                    }
                })
            },
            function getDeviceBal(callback) {
                // retrieve device balances
                var sql = 'SELECT usd, xbt, xlt, xrp FROM ' +
                          'sp_device_balances ($deviceid)'
                db.query('connConcierge', sql, {
                    $deviceid : deviceId
                }, function (err, rs) {
                    deviceBalUsd = parseInt(rs[0].usd)

                    callback()
                })
            },
            function getCashboxBal(callback) {
                // retrieve cashbox balance
                var sql = 'SELECT balance, numnotes FROM ' +
                          'sp_cashbox_balance ($deviceid)'
                db.query('connConcierge', sql, {
                    $deviceid : deviceId
                }, function (err, rs) {
                    cashboxBal = parseInt(rs[0].balance)
                    numNotes = parseInt(rs[0].numnotes)

                    callback()
                })
            },
            function getSummary7Day(callback) {
return callback()
                var sql = 'SELECT day_0, day_0_avg, day_1, day_1_avg, ' +
                          'day_2, day_2_avg, day_3, day_3_avg, day_4, day_4_avg, ' +
                          'day_5, day_5_avg, day_6, day_6_avg FROM ' +
                          'sp_device_summary_7 ($deviceid)'
                db.query('connConcierge', sql, {
                    $deviceid : deviceId
                }, function (err, rs) {

                    summary7.day0     = parseFloat(rs[0].day_0)
                    summary7.day0_avg = parseFloat(rs[0].day_0_avg)
                    summary7.day1     = parseFloat(rs[0].day_1)
                    summary7.day1_avg = parseFloat(rs[0].day_1_avg)
                    summary7.day2     = parseFloat(rs[0].day_2)
                    summary7.day2_avg = parseFloat(rs[0].day_2_avg)
                    summary7.day3     = parseFloat(rs[0].day_3)
                    summary7.day3_avg = parseFloat(rs[0].day_3_avg)
                    summary7.day4     = parseFloat(rs[0].day_4)
                    summary7.day4_avg = parseFloat(rs[0].day_4_avg)
                    summary7.day5     = parseFloat(rs[0].day_5)
                    summary7.day5_avg = parseFloat(rs[0].day_5_avg)
                    summary7.day6     = parseFloat(rs[0].day_6)
                    summary7.day6_avg = parseFloat(rs[0].day_6_avg)

                    callback()
                })
            },
            function getRecentTxs(callback) {
                var sql = 'SELECT FIRST(25) cashboxid, balance, is_active, ' +
                          'paid, referenceid, ' +
                          'num_1, num_5, num_10, num_20, num_50, num_100, ' +
                          'datecreated, lastupdate FROM ' +
                          'sp_cashbox_summary ($deviceid) ' +
                          'WHERE balance > 0 OR is_active = 1 ' +
                          'ORDER BY datecreated DESC'
                db.query('connConcierge', sql, {
                    $deviceid : deviceId
                }, function (err, rs) {
                    for (var i = 0; i < rs.length; i++) {
                        // initialize transaction object
                        var cashbox = {}

                        cashbox.id          = parseInt(rs[i].cashboxid)
                        cashbox.balance     = parseFloat(rs[i].balance)
                        cashbox.isActive    = parseInt(rs[i].is_active)
                        cashbox.paid        = parseInt(rs[i].paid)
                        cashbox.referenceid = rs[i].referenceid ? rs[i].referenceid.toString() : ''
                        cashbox.num1        = parseInt(rs[i].num_1)
                        cashbox.num5        = parseInt(rs[i].num_5)
                        cashbox.num10       = parseInt(rs[i].num_10)
                        cashbox.num20       = parseInt(rs[i].num_20)
                        cashbox.num50       = parseInt(rs[i].num_50)
                        cashbox.num100      = parseInt(rs[i].num_100)
                        cashbox.datecreated = moment(rs[i].datecreated).format()
                        cashbox.lastupdate  = moment(rs[i].lastupdate).format()

                        // add this transaction to the transactions list
                        cashboxes.push(cashbox)
                    }

                    callback()
                })
            },
            function displayPage(callback) {
                res.render(shared.baseDir + 'concierge/cashboxes', { 
                    pageTitle    : 'Cashboxes :. Modenero Manager',
                    profile      : profile,
                    device       : device,
                    deviceBalUsd : deviceBalUsd,
                    cashboxBal   : cashboxBal,
                    numNotes     : numNotes,
                    summary7     : summary7,
                    cashboxes    : cashboxes
                })
            }
        ])
    })
}

// cashbox
// exports.cashbox = require('./concierge/cashbox')

