const Slack = require('slack')

/* Set Slack bot token. */
const token = process.env.SLACK_BOT_TOKEN

/* Initialize bot. */
const bot = new Slack({ token })

/**
 * Slack Post
 */
const slackPost = function () {
    return new Promise(async function (resolve, reject) {
        console.log('\n\nSTARTING SLACK POST -- FINAL')

        // logs {args:{hyper:'card'}}
        // const result = await bot.api.test({ hyper:'card' })
        //     .catch(err => reject(err))
        // console.log('BOT RESULT -- FINAL', result)

        const sampleBlock = {
            channel: 'CQ3CP8WHW',
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
 * Slack Integration
 *
 * References:
 * - https://api.slack.com/interactive-messages
 */
const slackMenus = async function (req, res) {

    console.log(req)

    // await slackPost()

    const pkg = {
        "options": [{
            "text": {
                "type": "plain_text",
                "text": "*this is plain_text text*"
            },
            "value": "value-0"
        }, {
            "text": {
                "type": "plain_text",
                "text": "*this is plain_text text*"
            },
            "value": "value-1"
        }, {
            "text": {
                "type": "plain_text",
                "text": "*this is plain_text text*"
            },
            "value": "value-2"
        }]
    }

    /* Return the list. */
    return res.json(pkg)

}

module.exports = slackMenus
