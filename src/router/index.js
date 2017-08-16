import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import List from '@/components/Article/List'
import CreateArticle from '@/components/Article/createArticle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/article/new',
      name: 'CreateArticle',
      component: CreateArticle
    }
  ],
  mode: 'history'
})
