<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs10 sm8 md7 offset-md1>
        <v-layout row>
          <v-flex xs12>
            <h6 class="primary--text">List All Articles:</h6>
          </v-flex>
        </v-layout>

        <v-layout row wrap v-for="content in contents" :key="content.id" class="ml-1">

          <v-flex xs12>
              <a v-bind:href="content.link">

                  <v-layout row>

                    <v-flex>
                        <div>
                        {{ content.publication }} |  {{ content.author }}
                        </div>
                        <div>
                          <h6 class="black--text mb-0">{{ content.title }}</h6>
                          <div>{{ content.description }}</div>
                        </div>
                    </v-flex>
                  </v-layout>

              </a>
              <v-flex>
                <v-btn flat v-on:click="removeBook(content.id)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-flex>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
    </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import firebase from 'firebase'
  export default {
    data () {
      return {
      }
    },
    computed: {
      contents () {
        return this.$store.getters.loadedArticles
      },
      tops () {
        return this.$store.getters.tops
      },
      editors () {
        return this.$store.getters.editContents
      }
    },
    mounted () {
      setInterval(this.load, 1000)
    },
    methods: {
      removeBook: function (article) {
        let artRef = firebase.database().ref('Articles')
        artRef.child(article).remove()
      }
    }
  }
</script>

<style scoped>
a:link    {
  /* Applies to all unvisited links */
  text-decoration:  none;
  background-color: white;
  }

</style>
