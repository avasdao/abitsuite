import Vue from 'vue'
import VueRouter from 'vue-router'

/* Import SIDEBAR components. */
// import DashboardSidebar from '@/components/Sidebar/Dashboard'
// import CustomersSidebar from '@/components/Sidebar/Customers'

import Home from '@/views/Home'

/* Import MAIN components. */
import Dashboard from '@/views/Dashboard'

/* Initialize Vue Router. */
Vue.use(VueRouter)

/**
 * Initialize Routes
 */
const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/dashboard',
        component: Dashboard,
    },
]

/* Export Vue Router. */
export default new VueRouter({ routes })
