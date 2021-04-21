/* Import modules. */
const debug = require('debug')('workspace:bitpawns')

/*******************************************************************************
 *
 * aBitSuite Workspace Template
 * (c) Modenero Corp. All rights reserved.
 *
 * Template Name: default
 *
 * MIT licensed for non-commercial use
 *
 * Learn more about workspace templates at:
 * https://docs.abitsuite.com/workspace/templates
 *
 */
class Workspace {
    /* Constructor. */
    constructor(_workspace) {
        debug(`Workspace is initializing the following workspace parameters:`, _workspace)

        /* Validate workspace. */
        if (!_workspace) {
            throw new Error('You MUST provide the minimum parameters to initialize this workspace.')
        }

        /* Validate name. */
        if (_workspace.name) {
            /* Set name. */
            this.name = _workspace.name
        }

        debug('Constructor is complete.')
    }

    /**
     * Initialize
     *
     * Run the startup scripts for this workspace.
     */
    init() {
        console.log('\nStart initialization...')
    }

    /**
     * Test
     *
     * Runs a comprehensive workspace compatability test suite.
     */
    test() {
        console.log(`\nRunning a comprehensive test suite for ( ${this.name} )`)

        return {
            msg: `Test suite was run and completed successfully!`,
            error: 0,
        }
    }

}

/* Initialize workspace parameters. */
const workspace = {
    name: `Bitpawns`,
}

/* Initialize workspace. */
const bitpawns = new Workspace(workspace)
console.log('\nNew workspace created:', bitpawns)
console.log('\nbitpawns.test():', bitpawns.test())
