import "regenerator-runtime/runtime"
import "reflect-metadata"
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vue-material/dist/vue-material.min.css'
import VueMaterial from 'vue-material'
import Chat from 'vue-beautiful-chat'

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(Chat);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
