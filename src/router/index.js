import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home'

/* Import MAIN components. */
// import Invoice from '@/views/Invoice'
import Portal from '@/views/Portal'
import Dashboard from '@/views/Dashboard'
import Invoice from '@/views/Invoice'

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
                component: Invoice,
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

export default router
