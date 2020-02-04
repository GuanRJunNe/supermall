import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import toast from './components/common/toast/index'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false
// $bus
// 安装插件

Vue.prototype.$bus = new Vue()
Vue.use(toast);
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})
// 解决移动端300ms的延迟
FastClick.attach(document.body);
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
