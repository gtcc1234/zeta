// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.filter('usd', CurrencyFilter)

let config = {
  apiKey: 'AIzaSyAZLJtODg7WQ8OcUHD6ln4WazJV_MFXXgk',
  authDomain: 'epsilon-1f206.firebaseapp.com',
  databaseURL: 'https://epsilon-1f206.firebaseio.com',
  projectId: 'epsilon-1f206',
  storageBucket: 'epsilon-1f206.appspot.com',
  messagingSenderId: '24893826556'
}

firebase.initializeApp(config)

window.firebase = firebase

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
