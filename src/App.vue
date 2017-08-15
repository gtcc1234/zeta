<template>
  <v-app light>

      <v-layout fill-height>
        <v-flex xs1 m2 class="ml-3 mr-2 hidden-sm-and-up" offset-m-2 flexbox >
          <img src="../src/assets/logo.png" height="60em"></img>
        </v-flex>

        <v-flex xs1 m2 class="ml-3 mr-2 hidden-xs-only" offset-xs-1 flexbox >
          <img src="../src/assets/logo.png" height="70em"></img>
        </v-flex>

      <v-flex xs3 m4 class="ml-1 mr-3" flexbox>
            <h3 class="black--text">FinMASH.</h3>
      </v-flex>

      <v-flex xs7 m6 class="ml3" flexbox align-center>
          <h6 class="text-xs-center text-md-left primary--text">The latest and greatest of fintech.</h6>
      </v-flex>

    </v-layout>

        <v-toolbar class="primary">
          <v-toolbar-items>
            <v-btn dark flat v-for="item in menuItems" :key="item.title" router :to="item.link">
          {{ item.title }}
        </v-btn>
          </v-toolbar-items>
        </v-toolbar>

    <main>
      <router-view></router-view>
    </main>

    <v-footer fixed="fixed">
      <span>&copy; 2017</span>
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
        { title: 'List', link: '/list' }
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
</style>
