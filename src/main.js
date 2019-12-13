import Vue from 'vue'

/* Import router. */
import router from './router'

/* Import main application. */
import App from './App.vue'

Vue.config.productionTip = false

/* Initialize Vue.js application. */
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
