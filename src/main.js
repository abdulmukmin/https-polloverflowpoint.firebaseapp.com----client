import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import wysiwyg from "vue-wysiwyg"
import FBSignInButton from 'vue-facebook-signin-button'
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)
Vue.use(FBSignInButton)

Vue.use(wysiwyg, {})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
