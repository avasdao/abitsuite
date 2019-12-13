import Vue from 'vue'
import VueRouter from 'vue-router'

/* Import SIDEBAR components. */
import DashboardSidebar from '@/components/Sidebar/Dashboard'
import DbManagerSidebar from '@/components/Sidebar/DbManager'

/* Import MAIN components. */
import Dashboard from '@/components/Dashboard'
import DbManager from '@/components/DbManager'

/* Initialize Vue Router. */
Vue.use(VueRouter)

/**
 * Initialize Routes
 */
const routes = [{
    path: '/',
    component: Dashboard,
    // components: {
    //     default: Dashboard,
    //     sidebar: DashboardSidebar,
    // },
}, {
    path: '/db-manager',
    component: DbManager,
    // components: {
    //     default: DbManager,
    //     sidebar: DbManagerSidebar,
    // },
}]

/* Export Vue Router. */
export default new VueRouter({ routes })
