<template>
  <v-app light>
      <link rel="shortcut icon" type="image/png" href="/static/logo.png"/>
      <v-layout fill-height>
        <v-flex xs1 m2 class="ml-3 mr-2 hidden-sm-and-up pl-4" offset-m-2 flexbox >
          <img src="../src/assets/logo.png" height="60em"></img>
        </v-flex>

        <v-flex xs1 m2 class="ml-3 mr-2 hidden-xs-only pl-4" offset-xs-1 flexbox >
          <img src="../src/assets/logo.png" height="70em"></img>
        </v-flex>

      <v-flex xs3 m4 class="ml-1 mr-3" flexbox>
            <h3 class="black--text">FinMASH.</h3>
      </v-flex>

      <v-flex xs7 m6 class="ml3" flexbox align-center>
        <div id=header>
          <h6 class="text-xs-center text-md-left primary--text">{{ date | date }}</h6>
        </div>
      </v-flex>


    </v-layout>
<v-divider class="pt-1"></v-divider>


    <main>
      <router-view></router-view>
    </main>

    <v-footer>
      <span>&copy; The latest and greatest of fintech news....2017<a>Some Finmash Blog</a></span>
    </v-footer>

  </v-flex>


  </v-app>

</template>

<script>
export default {

  data () {
    return {
      date: '',
      menuItems: [
        { title: 'Home', link: '/' },
        { title: 'About', link: '/about' },
        { title: 'List', link: '/list' },
        { title: 'Create Article', link: '/article/new' },
        { title: 'Create Top News', link: '/article/newTop' }
      ]
    }
  },
  mounted () {
    setInterval(this.updateDateTime, 1000)
  },
  methods: {
    updateDateTime () {
      this.date = new Date()
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'

  #header{
    font-style
  }
</style>
