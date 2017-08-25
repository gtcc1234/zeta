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
    setTops (state, payload) {
      state.tops = payload
    },
    setEditorials (state, payload) {
      state.editorials.push(payload)
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
      let db = firebase.database()
      let articleRef = db.ref('Articles')

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
              date: obj[key].date,
              link: obj[key].link
            })
          }
          // call on mutation
          commit('setLoadedArticles', articles)
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
    loadTops ({commit}) {
      commit('setLoading', true)
      let db = firebase.database()
      let topRef = db.ref('Tops')

      topRef.once('value')
        .then((data) => {
          const tops = []
          const obj = data.val()
          for (let key in obj) {
            tops.push({
              id: key,
              title: obj[key].title,
              author: obj[key].author,
              publication: obj[key].publication,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              link: obj[key].link
            })
          }
          // call on mutation
          commit('setTops', tops)
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
    oadTops ({commit}) {
      commit('setLoading', true)
      let db = firebase.database()
      let editRef = db.ref('Editorials')

      editRef.once('value')
        .then((data) => {
          const edits = []
          const obj = data.val()
          for (let key in obj) {
            edits.push({
              id: key,
              title: obj[key].title,
              author: obj[key].author,
              publication: obj[key].publication,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              link: obj[key].link
            })
          }
          // call on mutation
          commit('setEditorials', edits)
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
        commit('setLoadedArticles', {...content, id: key})
      })
      .catch((error) => {
        console.log(error)
      })
    },
    createTops ({commit}, payload) {
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
      firebase.database().ref('Tops').push(content).then((data) => {
        const key = data.key
        firebase.database().ref('Tops').child(key).update({id: key})
        commit('setTops', {...content, id: key})
      })
      .catch((error) => {
        console.log(error)
      })
    },
    createEditorials ({commit}, payload) {
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
      firebase.database().ref('Editorials').push(content).then((data) => {
        const key = data.key
        firebase.database().ref('Editorials').child(key).update({id: key})
        commit('setEditorials', {...content, id: key})
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
      return state.loadedArticles.slice(0, 6)
    },
    tops (state, getters) {
      return state.tops.slice(0, 2)
    },
    editorials (state, getters) {
      return state.editorials.slice(0, 4)
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
