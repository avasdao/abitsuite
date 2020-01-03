import Vue from 'vue'
import VueRouter from 'vue-router'

/* Import SIDEBAR components. */
import DashboardSidebar from '@/components/Sidebar/Dashboard'
import CustomersSidebar from '@/components/Sidebar/Customers'

/* Import MAIN components. */
import Dashboard from '@/components/Dashboard'
import Customers from '@/components/Customers'

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
    path: '/customers',
    component: Customers,
    // components: {
    //     default: Customers,
    //     sidebar: CustomersSidebar,
    // },
}]

/* Export Vue Router. */
export default new VueRouter({ routes })
