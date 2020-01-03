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
        // 
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
