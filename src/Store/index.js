import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedContents: [],
    user: null
  },
  mutations: {
    createContent (state, payload) {
      state.loadedContents.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    createContent ({commit}, payload) {
      const content = {
        title: payload.title,
        link: payload.link,
        imageUrl: payload.imageUrl,
        description: payload.description,
        author: payload.author,
        publication: payload.publication,
        date: payload.date
      }
      // Reach out to firebase to store
      firebase.database().ref('Articles').push(content)
      commit('createContent', content)
    },
    createUser ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(user => {
        const newUser = {
          id: user.uid,
          registeredContents: [ ]
        }
        commit('setUser', newUser)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  getters: {
    loadedContents (state) {
      return state.loadedContents.sort((contentA, contentB) => {
        return contentA.date > contentB.date
      })
    },
    featuredContents (state, getters) {
      return getters.loadedContents.slice(0, 6)
    },
    editContents (state, getters) {
      return getters.loadedContents.slice(0, 3)
    },
    user (state) {
      return state.user
    },
    loadedContent (state) {
      return (contentId) => {
        return state.loadedContents.find((content) => {
          return content.id === contentId
        })
      }
    }
  }
})