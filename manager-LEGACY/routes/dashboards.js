var async   = require('async')
var moment  = require('moment')
var numeral = require('numeral')

var db        = require('../db')
var errors    = require('../errors')
var functions = require('../functions')

var shared = require('./shared')

// initialize default (catch-all)
exports.index = function(req, res) {
    shared.getProfile(req.user, function (err, profile) {
        if (err) return shared.pageNotFound(req, res)
// console.log('req', req)
// console.log('req.query', req.query)
// console.log('req.session 1', req.session)
// req.session.test = 'testing'
// req.session.token = req.query.token
// req.session.uid = req.query.uid
// console.log('req.session 2', req.session)
        var profit      = {}
            profit.day  = []
        var totalSum    = 0
        var last24Hours = 0
        var last7Days   = 0
        var last30Days  = 0
        var txs         = []

        async.series([
            function getSums(callback) {
return callback(null)
                // retrieve device summary
                var sql = 'SELECT SUM(total_sum) total_sum, ' +
                          'SUM(last24hours) last24hours, SUM(last7days) last7days, ' +
                          'SUM(last30days) last30days FROM ' +
                          'sp_profile_summary ($profileid)'
                db.query('connConcierge', sql, {
                    $profileid : profile.profileId
                }, function (err, rs) {
                    totalSum    = parseInt(rs[0].total_sum)
                    last24Hours = parseInt(rs[0].last24hours)
                    last7Days   = parseInt(rs[0].last7days)
                    last30Days  = parseInt(rs[0].last30days)

                    callback()
                })
            },
            function getProfits(callback) {
return callback(null)
                // initialize profit days
                for (var i = 0; i < 31; i++) {
                    profit.day[i] = 0
                }

                async.each(profile.devices, function (device, callback) {
                    // initialize day
                    var day = 0

                    // cycle through each day
                    async.whilst(function () { return day < 30 }, function (callback) {
                        var sql = 'SELECT total FROM ' +
                                  'sp_device_profit ($deviceid, $datefrom, $dateto)'
                        db.query('connConcierge', sql, {
                            $deviceid : device.deviceId,
                            $datefrom : moment().subtract((day + 1), 'days').format('YYYY.MM.DD 00:00:00'),
                            $dateto   : moment().format('YYYY.MM.DD 00:00:00')
                        }, function (err, rs) {
                            if (err) return callback(err)
// console.log('device', device, rs)
                            if (rs.length) {
                                profit.day[day] = profit.day[day] + parseFloat(rs[0].total)

                                // add this transaction to the transactions list
                                // txs.push(tx)
                            }

                            // increment day
                            day++

                            callback()
                        })
                    }, callback)
                }, callback)
            },
            function getRecentTxs(callback) {
return callback(null)
                var sql = 'SELECT FIRST(5) transactionid, currencyid, amount, referenceid FROM ' +
                          'sp_device_txs ($deviceid) ' +
                          'ORDER BY lastupdate DESC'
                db.query('connConcierge', sql, {
                    $deviceid : deviceId
                }, function (err, rs) {
                    for (var i = 0; i < rs.length; i++) {
                        // initialize transaction object
                        var tx = {}

                        tx.transactiondId = parseFloat(rs[i].transactionid)
                        tx.currencyId     = parseInt(rs[i].currencyid)
                        tx.amount         = parseFloat(rs[i].amount)
                        tx.referenceId    = rs[i].referenceid.toString()

                        // add this transaction to the transactions list
                        txs.push(tx)
                    }

                    callback()
                })
            },
            function displayPage(callback) {
                res.render(shared.baseDir + 'index', { 
                    pageTitle   : 'Modenero Manager :. New Money Beginnings™',
                    profile     : profile,
                    profit      : profit,
                    totalSum    : numeral(totalSum / 100).format('$0,0.00'),
                    last24Hours : numeral(last24Hours / 100).format('$0,0.00'),
                    last7Days   : numeral(last7Days / 100).format('$0,0.00'),
                    last30Days  : numeral(last30Days / 100).format('$0,0.00'),
                    txs         : txs,
                    token       : req.query.token || '',
                    uid         : req.query.uid || ''
                })
            }
        ])
    })
}

// cashbox
// exports.cashbox = require('./concierge/cashbox')

