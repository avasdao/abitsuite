import Vue from 'vue'

/* Import router. */
import router from './router'

/* Import main application. */
import App from './App.vue'

/* Import tailwind. */
import 'tailwindcss/tailwind.css'

import store from './store'

Vue.config.productionTip = false

/* Initialize Vue.js application. */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
