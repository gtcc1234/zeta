// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import * as firebase from 'firebase'
import { store } from './Store'
import DateFilter from './filters/date'
import CurrencyFilter from './filters/currency'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.filter('usd', CurrencyFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAZLJtODg7WQ8OcUHD6ln4WazJV_MFXXgk',
      authDomain: 'epsilon-1f206.firebaseapp.com',
      databaseURL: 'https://epsilon-1f206.firebaseio.com',
      projectId: 'epsilon-1f206',
      storageBucket: 'epsilon-1f206.appspot.com',
      messagingSenderId: '24893826556'
    })
    this.$store.dispatch('loadArticles')
    this.$store.dispatch('loadTops')
    this.$store.dispatch('loadEditorials')
  }
})
