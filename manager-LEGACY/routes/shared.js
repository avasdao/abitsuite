var async    = require('async')
var gravatar = require('gravatar')

var db        = require('../db')
var errors    = require('../errors')
var functions = require('../functions')

// set the base directory
var baseDir = __dirname + '/../views/manager/'

// export the base directory
exports.baseDir = baseDir

// retrieve user info
var getProfile = function(user, callback) {
    // initialize profile
    var profile = {
        profileId : null,
        nickcname : 'Unknown',
        gravatar  : ''
    }

    // set email address from user
    profile.email = user

    async.series([
        function getNickname(callback) {
            var sql = 'SELECT profileid, nickname FROM ' +
                      'sp_profile_byemail ($email)'
            db.query('connMain', sql, {
                $email : functions.sqliFilter(user)
            }, function (err, rs) {
                if (err) return callback(err)

                if (rs.length) {
                    profile.profileId = parseInt(rs[0].profileid)
                    profile.nickname  = rs[0].nickname.toString()

                    callback(null)
                } else {
                    callback('ERROR! (getNickname) - User not found in database.')
                }
            })
        },
        function getGravatar(callback) {
            var options = {
                s : 60, 
                // d : '/manager/images/incognito.png'
                d : 'mm'
            }

            // add gravatar to profile
            profile.gravatar = gravatar.url(user, options)

            callback(null)
        },
        function getDevices(callback) {
            // initialize devices
            var devices = []

            var sql = 'SELECT deviceid FROM ' +
                      'sp_profile_equity ($profileid) ' +
                      'GROUP BY deviceid'
            db.query('connConcierge', sql, {
                $profileid : profile.profileId
            }, function (err, rs) {
                if (err) return callback(err)

                async.eachSeries(rs, function (item, callback) {
                    var device = {}

                    device.deviceId = item.deviceid.toString()

                    // lookup device name
                    var sql = 'SELECT title, code, rate_buy, rate_sell FROM ' +
                              'sp_device_byid ($deviceid)'
                    db.query('connConcierge', sql, {
                        $deviceid : device.deviceId
                    }, function (err, rs) {
                        if (err) return callback(err)

                        device.title    = rs[0].title.toString()
                        device.code     = rs[0].code.toString()
                        device.rateBuy  = parseFloat(rs[0].rate_buy)
                        device.rateSell = parseFloat(rs[0].rate_sell)

                        // add device to devices
                        devices.push(device)

                        // move to next device id
                        callback()
                    })
                }, function (err) {
                    // sort the devices alphabetically
                    devices.sort(function (a, b) {
                        var x = a.title.toLowerCase(),
                            y = b.title.toLowerCase()

                        return x < y ? -1 : x > y ? 1 : 0
                    })

                    // add devices to profile
                    profile.devices = devices

                    callback(null)
                })
            })
        },
        function complete() {
            callback(null, profile)
        }
    ], function (err) {
        if (err) callback(err)
    })
}

// export
exports.getProfile = getProfile

// show a page not found (404) error
exports.pageNotFound = function(req, res) {
    // if the page is not found
    getProfile(req.user, function (err, profile) {
        res.render(baseDir + '404', {
            pageTitle : 'Page Not Found :. Modenero Manager',
            profile   : profile
        })
    })

}
