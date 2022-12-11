const moment = require('moment')
const PouchDB = require('pouchdb')
const Slack = require('slack')
const superagent = require('superagent')

/* Initialize database. */
// const db = new PouchDB('data/slack')

/* Initialize (remote) replication. */
// db.sync('http://slack:XXX@localhost:5984/slack', {
//     live: true,
//     retry: true
// })
// PouchDB.sync('data/slack', 'http://slack:XXX@localhost:5984/slack', {
// // PouchDB.sync('data/slack', 'http://slack:XXX@host.docker.internal:5984/slack', {
//     live: true,
//     retry: true
// }).on('change', function (info) {
//     // handle change
//     console.log('PouchDB Replication CHANGE', info)
// }).on('paused', function (err) {
//     // replication paused (e.g. replication up to date, user went offline)
//     console.log('PouchDB Replication PAUSED', err)
// }).on('active', function () {
//     // replicate resumed (e.g. new changes replicating, user went back online)
//     console.log('PouchDB Replication ACTIVE')
// }).on('denied', function (err) {
//     // a document failed to replicate (e.g. due to permissions)
//     console.log('PouchDB Replication DENIED', err)
// }).on('complete', function (info) {
//     // handle complete
//     console.log('PouchDB Replication COMPLETE')
// }).on('error', function (err) {
//     // handle error
//     console.log('PouchDB Replication ERROR', err)
// })

/* Generate UUID v4. */
const uuidv4 = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

/* Set Slack bot token. */
const token = process.env.SLACK_BOT_TOKEN

/* Initialize bot. */
const bot = new Slack({ token })

/**
 * Slack Post
 */
const botPost = function () {
    return new Promise(async function (resolve, reject) {
        console.log('\n\nSTARTING SLACK POST -- FINAL')

        // logs {args:{hyper:'card'}}
        // const result = await bot.api.test({ hyper:'card' })
        //     .catch(err => reject(err))
        // console.log('BOT RESULT -- FINAL', result)

        const sampleBlock = {
            channel: 'CRU07FCSD',
            text: '',
            user: 'UQ5AXJW06',
            blocks: [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "This is just a *QUICK* sample of `1337` stuff for sale."
                    },
                    "accessory": {
                        "type": "overflow",
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "*this is plain_text text*"
                                },
                                "value": "value-0"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "*this is plain_text text*"
                                },
                                "value": "value-1"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "*this is plain_text text*"
                                },
                                "value": "value-2"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "*this is plain_text text*"
                                },
                                "value": "value-3"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "*this is plain_text text*"
                                },
                                "value": "value-4"
                            }
                        ],
                        "action_id": "overflow"
                    }
                }, {
                    "type": "section",
                    "block_id": "section567",
                    "text": {
                        "type": "mrkdwn",
                        "text": "<https://google.com|Overlook Hotel> \n :star: \n Doors had too many axe holes, guest in room 237 was far too rowdy, whole place felt stuck in the 1920s."
                    },
                    "accessory": {
                        "type": "image",
                        "image_url": "https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg",
                        "alt_text": "Haunted hotel image"
                    }
                }, {
                    "type": "section",
                    "block_id": "section789",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": "*Average Rating*\n1.0"
                        }
                    ],
                    accessory: {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "Do Something Cool"
                        },
                        action_id: "button",
                        value: "click_me_123"
                    }
                }, {
                    "type": "section",
                    "block_id": "section888",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": "This is _NOT_ very slick :("
                        }
                    ],
                    accessory: {
                        "action_id": "text1234",
                        "type": "multi_static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select items"
                        },
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "*this is plain_text text*"
                                },
                                "value": "value-0"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "*this is plain_text text*"
                                },
                                "value": "value-1"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "*this is plain_text text*"
                                },
                                "value": "value-2"
                            }
                        ]
                    }
                }
            ]
        }

        const result2 = await bot.chat.postEphemeral(sampleBlock)
        // const result2 = await bot.chat.postMessage(sampleBlock)
            .catch(err => reject(err))
        console.log('BOT RESULT -- FINAL 2', result2)

        return resolve()
    })

}

/**
 * Post To Channel
 */
const slackPost = async function (_body) {
    const roomId = 'TPQB33LE6/BRU149MQR/r7YvuSjmbykGI5Oxges4dMnc' // abitsuite

    /* Set url. */
    const url = `https://hooks.slack.com/services/${roomId}`

    try {
        await superagent
            .post(url)
            .send(_body) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {
                // Calling the end function will send the request
            })
    } catch (err) {
        console.error(err)
    }
}

/**
 * Slack Integration
 *
 * References:
 * - https://api.slack.com/interactive-messages
 */
const slack = async function (req, res) {

    // console.log(req)
    // console.log('HEADERS', req.headers)

    /* Set request body. */
    const body = req.body

    console.log('BODY', body)

    /* Validate Slack body. */
    if (body && body.challenge) {
        console.log('Detected/handling a Slack challenge.', body.challenge)

        /* Set challenge (response). */
        const challenge = body.challenge

        /* Return challenge. */
        return res.json({ challenge })
    }

    // await botPost()

    const msg = '*Incoming slack webhook..* '

    /* Set body. */
    const slackMsg = {
        text: msg +
        '\n\n```' + JSON.stringify(body, null, 4) + '```'

    }

    // slackPost(slackMsg)

    const dbEntry = {
        _id: uuidv4(),
        body
    }

    // const result = await db.put(dbEntry)
    //     .catch(console.error)
    // console.log('DB RESULT', result)

    // console.log({ slackMsg, dbEntry })

    /* Return the list. */
    // return res.json({ slackMsg, dbEntry })

    const testBody = {
        text: '',
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Is this working? I don't know???"
                },
                "accessory": {
                    "type": "overflow",
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*this is plain_text text*"
                            },
                            "value": "value-0"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*this is plain_text text*"
                            },
                            "value": "value-1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*this is plain_text text*"
                            },
                            "value": "value-2"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*this is plain_text text*"
                            },
                            "value": "value-3"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*this is plain_text text*"
                            },
                            "value": "value-4"
                        }
                    ],
                    "action_id": "overflow"
                }
            }, {
                "type": "section",
                "block_id": "section567",
                "text": {
                    "type": "mrkdwn",
                    "text": "<https://google.com|Overlook Hotel> \n :star: \n Doors had too many axe holes, guest in room 237 was far too rowdy, whole place felt stuck in the 1920s."
                },
                "accessory": {
                    "type": "image",
                    "image_url": "https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg",
                    "alt_text": "Haunted hotel image"
                }
            }, {
                "type": "section",
                "block_id": "section789",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": "*Average Rating*\n1.0"
                    }
                ],
                accessory: {
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: "Do Something Cool"
                    },
                    action_id: "button",
                    value: "click_me_123"
                }
            }, {
                "type": "section",
                "block_id": "section888",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": "This is _NOT_ very slick :("
                    }
                ],
                accessory: {
                    "action_id": "text1234",
                    "type": "multi_static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select items"
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*this is plain_text text*"
                            },
                            "value": "value-0"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*this is plain_text text*"
                            },
                            "value": "value-1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*this is plain_text text*"
                            },
                            "value": "value-2"
                        }
                    ]
                }
            }
        ]
    }

    if (body.payload) {
        try {
            const payload = JSON.parse(body.payload)

            console.log('PAYLOAD', payload)

            const trigger_id = payload.trigger_id

            const interact = {
                trigger_id,
                "view": {
                    "type": "modal",
                    "callback_id": "modal-identifier",
                    "title": {
                        "type": "plain_text",
                        "text": "Just a modal"
                    },
                    "blocks": [
                        {
                            "type": "section",
                            "block_id": "section-identifier",
                            "text": {
                                "type": "mrkdwn",
                                "text": "*Welcome* to ~my~ Block Kit _modal_!"
                            },
                            "accessory": {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Just a button"
                                },
                                "action_id": "button-identifier"
                            }
                        }
                    ]
                }
            }

            const interact2 = {
                trigger_id,
                dialog: {
                    "callback_id": "ryde-46e2b0",
                    "title": "Request a Ride",
                    "submit_label": "Request",
                    "state": "Limo",
                    "elements": [
                        {
                            "type": "text",
                            "label": "Pickup Location",
                            "name": "loc_origin"
                        },
                        {
                            "type": "text",
                            "label": "Dropoff Location",
                            "name": "loc_destination"
                        }
                    ]
                }
            }

            console.log('\n\n', interact2, '\n\n')

            res.end('nothing to see here')

            const result3 = await bot.dialog.open(interact2)
                .catch(err => console.error(err))
            console.log('BOT RESULT -- FINAL 3', result3)
        } catch (e) {
            console.error(e)
        }
    } else {
        return res.json(testBody)
    }

}

module.exports = slack
