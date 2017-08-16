import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedContents: [
      {
        imageUrl: 'https://bitcoin.org/img/icons/opengraph.png', id: '1', title: 'This is the headline for article 1', date: '2017-07-17', link: 'https://bitcoin.org', author: 'John Doe', publication: 'Publication', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis'
      },
      {
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqL_dAHmx6dx9W1ITcKJFryZEuLJYavVHJuDDiXu6lq85db8fMtQ', id: 'aaaa41231123aa2', title: 'This is the headline for article 2', date: '2017-07-19', link: 'https://www.ethereum.org', author: 'John Doe', publication: 'Publication', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis'
      },
      {
        imageUrl: 'http://technode.com/wp-content/uploads/2015/12/technode-logo-ob-200.png', id: '3', title: 'This is the headline for article 3', date: '2017-07-04', link: 'http://technode.com/2017/07/20/ant-financial-invests-shanghai-based-fintech-startup-vfinance/', author: 'John Doe', publication: 'Publication', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis'
      },
      {
        imageUrl: 'http://www.businessinsider.com/', id: '4', title: 'This is the headline for article 4', date: '2017-07-10', link: 'http://www.businessinsider.com/global-fintech-funding-rebounds-2017-7', author: 'John Doe', publication: 'Publication', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis'
      },
      {
        imageUrl: '', id: '5', title: 'This is the headline for article 5', date: '2017-07-31', link: 'http://technode.com/2017/07/20/ant-financial-invests-shanghai-based-fintech-startup-vfinance/', author: 'John Doe', publication: 'Publication', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis'
      },
      {
        imageUrl: '', id: '6', title: 'This is the headline for article 6', date: '2017-07-30', link: 'http://technode.com/2017/07/20/ant-financial-invests-shanghai-based-fintech-startup-vfinance/', author: 'John Doe', publication: 'Publication', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis'
      },
      {
        imageUrl: '', id: '7', title: 'This is the headline for article 7', date: '2017-07-29', link: 'http://technode.com/2017/07/20/ant-financial-invests-shanghai-based-fintech-startup-vfinance/', author: 'John Doe', publication: 'Publication', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis'
      }
    ],
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
      // Reach out to firebase to store
      let articlesRef = firebase.database().ref('Articles')
      let articleKey = articlesRef.push(content).key
      let newID = { id: articleKey }
      articlesRef.child(articleKey).update(newID)
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
