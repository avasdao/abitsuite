'use strict'

const express = require('express')

/* 3rd-party Integrations. */
const slack = require('./slack')
const slackMenus = require('./slack-menus')

/* Set constants. */
const HOST = '0.0.0.0'
// const PORT = 5300
const PORT = 8080

/* Initialize application. */
const app = express()

/* Initialize JSON parser. */
app.use(express.json())

/* Initialize URL parser. */
app.use(express.urlencoded({ extended: true }))

/* Configure application. */
app.use(function (req, res, next) {
    /* Initialize headers. */
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Telr-Address, X-Telr-Secret, X-Telr-Signature')
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT')

    /* Move to next process. */
    next()
})


// TODO: Replace with a "static" site.
app.get('/', (req, res) => {
    res.end('<h1>Welcome to the Telr.io API</h1>')
})

// FOR DEVELOPMENT PURPOSES ONLY
// FIXME
app.get('/v1/customers', (req, res) => {
    console.log('\n\nHEADERS', req.headers)
    console.log('URL', req.url)
    console.log('PARAMS', req.params)
    console.log('QUERY', req.query)
    console.log('BODY', req.body)
    res.json(require('./data/sample-datatable-objects.json'))
})

app.post('/v1/customers', (req, res) => {
    console.log('\n\nHEADERS', req.headers)
    console.log('URL', req.url)
    console.log('PARAMS', req.params)
    console.log('QUERY', req.query)
    console.log('BODY', req.body)

    const body = {
        id: 100,
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        extension: req.body.extension,
        startDate: req.body.startDate,
        salary: req.body.salary
    }

    res.json(body)
})

app.put('/v1/customers/:id', (req, res) => {
    console.log('\n\nHEADERS', req.headers)
    console.log('URL', req.url)
    console.log('PARAMS', req.params)
    console.log('QUERY', req.query)
    console.log('BODY', req.body)

    const body = {
        id: req.body.id,
        name: req.body.name,
        position: req.body.position,
        office: 'West Bumblefck',
        extension: req.body.extension,
        startDate: req.body.startDate,
        salary: req.body.salary
    }

    res.json(body)
})

app.delete('/v1/customers/:id', (req, res) => {
    console.log('\n\nHEADERS', req.headers)
    console.log('URL', req.url)
    console.log('PARAMS', req.params)
    console.log('QUERY', req.query)
    console.log('BODY', req.body)
    res.json({"ok":true})
})

// TODO: Offer help.
app.get('/v1', (req, res) => {
    res.end('Oops! I think you forgot something..')
})

/* Slack integration. */
app.post('/v1/slack', slack)
app.get('/v1/slack/menus', slackMenus)
app.post('/v1/slack/menus', slackMenus)

/* Start listening for connections. */
app.listen(PORT, HOST)

/* Display current environment variables. */
console.info()
console.log(`Running on http://${HOST}:${PORT}`)
console.info()
console.info('Current Environment Variables')
console.info('-----------------------------')
console.info('  - NODE_ENV        :', process.env.NODE_ENV)
console.info('  - API_ENDPOINT    :', process.env.API_ENDPOINT)
console.info('  - SLACK_BOT_TOKEN :', process.env.SLACK_BOT_TOKEN)
console.info()
