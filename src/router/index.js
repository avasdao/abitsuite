import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home'

/* Import MAIN components. */
import Portal from '@/views/Portal'

/**
 * Initialize Routes
 */
const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/portal',
        component: Portal,
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
