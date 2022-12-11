/**
 * Suite JavaScript Handler
 *
 * This code will be excuted immediately following the loading
 * of the remote script file.
 */
const suiteJsHandler = () => {
    console.log('\nSuite class has been loaded successfully!')

    /* Create new suite. */
    // NOTE: `Suite` has been injected into the global scope.
    const suite = new Suite()
    console.log('\nActive suite:', suite)

    /* Run suite test. */
    console.log('\nStarting suite test..', suite.test())
}

/* Export module. */
module.exports = suiteJsHandler
