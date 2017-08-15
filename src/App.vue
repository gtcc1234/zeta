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
            <v-btn flat dark>Home</v-btn>
            <v-btn flat dark>About</v-btn>
          </v-toolbar-items>
        </v-toolbar>

    <main>
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
        tabs: [1, 2, 3]
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
