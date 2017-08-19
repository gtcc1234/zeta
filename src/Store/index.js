import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedArticles: [],
    editorials: [],
    tops: [],
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
    setTops (state, payload) {
      state.tops.push(payload)
      // .log(state.tops)
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
      // set to loading
      commit('setLoading', true)
      // db ref load Articles and value
      let db = firebase.database()
      let articleRef = db.ref('Articles')
      let topsRef = db.ref('Tops')
      // let editorialsRef = db.ref('Editorials')
      articleRef.once('value')
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
          // call on mutation
          commit('setLoadedArticles', articles)
          // set Tops
          topsRef.once('value').then((data) => {
            const tops = []
            const obj = data.val()
            for (let key in obj) {
              articleRef.child(obj[key].id).once('value').then((data) => {
                const obj1 = data.val()
                tops.push({
                  id: obj1.id,
                  title: obj1.title,
                  author: obj1.author,
                  publication: obj1.publication,
                  description: obj1.description,
                  imageUrl: obj1.imageUrl,
                  date: obj1.date
                })
              })
              // console.log(tops)
              commit('setTops', tops)
            }
          })
          // console.log(editorialsRef)
          // set loading to false
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
    tops (state, getters) {
      return state.tops.slice(0, 6)
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
