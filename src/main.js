import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import ns from '@/netServices/netService'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/style.less'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$ns = ns

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
