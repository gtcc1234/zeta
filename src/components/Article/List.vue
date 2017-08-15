<template>
  <v-container>
    <v-layout row>
      <h6 class="primary--text">Top News</h6>
    </v-layout>
      <v-layout row wrap v-for="content in contents" :key="content.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
          <v-card class="info" >
            <v-container fluid>
              <v-layout row>
                <v-flex xs5 sm4 md3>
                  <v-card-media
                     :src="content.imageUrl"
                     height="130px"
                     contain
                   ></v-card-media>
                </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                <h5 class="white--text mb-0">{{ content.title }}</h5>
                  <div>{{ content.date }}</div>
              </div>
              </v-card-title>
              <v-card-actions>
                <a v-bind:href="content.link"><v-btn flat><v-icon left light >arrow_forward</v-icon>
                  Link </v-btn></a>
              </v-card-actions>
            </v-flex>
              </v-layout>
            </v-container>
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      contents () {
        return this.$store.getters.loadedContents
      }
    }
  }
</script>

<style scoped>
a:link    {
  /* Applies to all unvisited links */
  text-decoration:  none;
  font-weight:      bold;
  background-color: #364caa;
  color:            blue;
  }

</style>
