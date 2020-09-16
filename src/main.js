import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/global.css'
import './assets/fonts/iconfont.css'
//请求头里添加Authorization属性
axios.interceptors.request.use(config =>{
    config.headers.Authorization = sessionStorage.getItem("logintoken");
    return config;
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
