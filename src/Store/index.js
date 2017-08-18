import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedArticles: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedArticles (state, payload) {
      state.loadedArticles = payload
    },
    createArticle (state, payload) {
      state.loadedArticles.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadArticles ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('Articles').once('value')
        .then((data) => {
          const articles = []
          const obj = data.val()
          for (let key in obj) {
            articles.push({
              id: key,
              title: obj[key].title,
              author: obj[key].author,
              publication: obj[key].publication,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date
            })
          }
          commit('setLoadedArticles', articles)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createArticle ({commit}, payload) {
      const content = {
        title: payload.title,
        link: payload.link,
        imageUrl: payload.imageUrl,
        description: payload.description,
        author: payload.author,
        publication: payload.publication,
        date: payload.date.toISOString()
      }
      // Reach out to firebase to store
      firebase.database().ref('Articles').push(content).then((data) => {
        const key = data.key
        firebase.database().ref('Articles').child(key).update({id: key})
        commit('createArticle', {...content, id: key})
      })
      .catch((error) => {
        console.log(error)
      })
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
    loadedArticles (state) {
      return state.loadedArticles
    },
    featuredArticles (state, getters) {
      return getters.loadedArticles.slice(0, 6)
    },
    loadedMeetup (state) {
      return (contentId) => {
        return state.loadedArticles.find((article) => {
          return article.id === contentId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
