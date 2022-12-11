import {
    createRouter,
    createWebHistory,
    createWebHashHistory
} from 'vue-router'

import Home from '@/views/Home'

/* Import MAIN components. */
// import Invoice from '@/views/Invoice'
import Portal from '@/views/Portal'
import Dashboard from '@/views/Dashboard'

/* Import views. */
import development from './development'

/**
 * Initialize Routes
 */
const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/',
        component: Portal,
        children: [
            {
                path: 'dashboard',
                component: Dashboard,
            },
            {
                path: 'invoice',
                component: () => import(/* webpackChunkName: "portal" */ '@/views/Portal/Invoice'),
            },
        ],
    },

    ...development,
]

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: process.env.BASE_URL === '/' ? createWebHistory() : createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    linkActiveClass: 'active', // TODO: We should localize this to Navbar's scope.
})

export default router
