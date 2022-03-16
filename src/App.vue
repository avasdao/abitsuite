<template>
    <main>
        <router-view />

        <Footer />
    </main>
</template>

<script>
/* Import components. */
import Footer from '@/components/Footer.vue'

export default {
    components: {
        Footer,
    },
    data: () => {
        return {
            // TODO
        }
    },
    methods: {
        /**
         * Load Suite
         *
         * Retrieves and imports a remote script to manage the suite.
         */
        // async loadSuite(_suiteUrl) {
        //     /* Retrieve the suite's remote script. */
        //     const suite = await fetch(_suiteUrl)
        //     // console.log('\nSUITE:', suite)
        //
        //     /* Set the body of the script. */
        //     const body = await suite.text()
        //     // return console.log('\nBODY:', body)
        //
        //     const suiteJsHandler = require('./libs/suiteJsHandler')
        //
        //     /* Insert remote script. */
        //     // NOTE: This is a highly INSECURE procedure.
        //     //       Much care MUST be taken to mitigate against attacks.
        //     const suiteJs = document.createElement('script')
        //           suiteJs.setAttribute('type','text/javascript')
        //           suiteJs.setAttribute('src', _suiteUrl)
        //           suiteJs.addEventListener('load', suiteJsHandler, false)
        //     document.getElementsByTagName('head')[0].appendChild(suiteJs)
        //
        // },
    },
    created: function () {
        /* Set suite url. */
        // const suiteUrl = 'http://localhost:9000/com.bitpawns/index.js'

        /* Load suite. */
        // this.loadSuite(suiteUrl)
    },
    mounted: function () {
        console.info('Main application has mounted!')
    },
}
</script>
