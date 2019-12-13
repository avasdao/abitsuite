import Vue from 'vue'
import VueRouter from 'vue-router'

/* Import components. */
import Dashboard from '@/components/Dashboard'
import DbManager from '@/components/DbManager'

/* Initialize Vue Router. */
Vue.use(VueRouter)

/**
 * Initialize Routes
 */
const routes = [{
    path: '/',
    component: Dashboard
}, {
    path: '/db-manager',
    component: DbManager
}]

/* Export Vue Router. */
export default new VueRouter({ routes })
