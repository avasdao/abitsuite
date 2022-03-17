/* Initialize routes. */
const routes = [
    {
        path: '/dev/tips/front-end',
        component: () => import(/* webpackChunkName: "dev" */ '@/views/Development/Tips'),
    },
]

/* Export routes. */
export default routes
