/* Import modules. */
const debug = require('debug')('suites:bitpawns')

/*******************************************************************************
 *
 * (Default) Suite Template
 * (c) Modenero Corp. All rights reserved.
 *
 * MIT licensed for non-commercial use
 *
 * Learn more about suite templates at:
 * https://docs.abitsuite.com/suites/templates
 *
 * Learn more about this specific templates at:
 * https://docs.abitsuite.com/suites/templates/default
 *
 */
class Suite {
    /* Constructor. */
    constructor(_suite) {
        debug(`Suite is initializing the following suite parameters:`, _suite)

        /* Validate suite. */
        if (!_suite) {
            throw new Error('You MUST provide the minimum parameters to initialize this suite.')
        }

        /* Validate name. */
        if (_suite.name) {
            /* Set name. */
            this.name = _suite.name
        }

        debug('Constructor is complete.')
    }

    /**
     * Initialize
     *
     * Run the startup scripts for this suite.
     */
    init() {
        console.log('\nStart initialization...')
    }

    /**
     * Test
     *
     * Runs a comprehensive series of compatability tests for this suite.
     */
    test() {
        console.log(`\nRunning a series of comprehensive tests for ( ${this.name} )`)

        return {
            msg: `All tests have run and completed successfully!`,
            error: 0,
        }
    }

}

/* Initialize suite parameters. */
const suite = {
    name: `Bitpawns`,
}

/* Initialize suite. */
const bitpawns = new Suite(suite)
console.log('\nNew suite created:', bitpawns)
console.log('\nbitpawns.test():', bitpawns.test())
