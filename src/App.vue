<template>
    <div class="app">
        <SidebarPanel />

        <div class="content ht-100v pd-0">
            <div class="content-header">
                <div class="content-search">
                    <i data-feather="search"></i>
                    <input type="search" class="form-control" placeholder="Search...">
                </div>

                <nav class="nav">
                    <a href="javascript://" class="nav-link"><i data-feather="help-circle"></i></a>
                    <a href="javascript://" class="nav-link""><i data-feather="grid"></i></a>
                    <a href="javascript://" class="nav-link"><i data-feather="align-left"></i></a>
                </nav>
            </div>

            <div class="content-body">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import SidebarPanel from '@/components/Sidebar/MainPanel.vue'

export default {
    components: {
        SidebarPanel
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
        async loadSuite(_suiteUrl) {
            /* Retrieve the suite's remote script. */
            const suite = await fetch(_suiteUrl)
            // console.log('\nSUITE:', suite)

            /* Set the body of the script. */
            const body = await suite.text()
            // return console.log('\nBODY:', body)

            const suiteJsHandler = require('./libs/suiteJsHandler')

            /* Insert remote script. */
            // NOTE: This is a highly INSECURE procedure.
            //       Much care MUST be taken to mitigate against attacks.
            const suiteJs = document.createElement('script')
                  suiteJs.setAttribute('type','text/javascript')
                  suiteJs.setAttribute('src', _suiteUrl)
                  suiteJs.addEventListener('load', suiteJsHandler, false)
            document.getElementsByTagName('head')[0].appendChild(suiteJs)

        },
    },
    created: function () {
        /* Set suite url. */
        const suiteUrl = 'http://localhost:9000/com.bitpawns/index.js'

        /* Load suite. */
        this.loadSuite(suiteUrl)
    },
    mounted: function () {
        console.info('Main application has mounted!')
    },
}
</script>

<!-- This is the application's GLOBAL style -->
<style>
/* TODO */
</style>
