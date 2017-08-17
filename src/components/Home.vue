<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs10 sm8 md7 offset-md1>
        <v-layout row>
          <v-flex xs12>
            <h6 class="primary--text">Top News</h6>
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

                    <v-flex m3>
                        <v-card-media
                        :src="content.imageUrl"
                        height="50px" contain></v-card-media>
                    </v-flex>


                  </v-layout>

              </a>

            <v-divider></v-divider>
          </v-flex>

      </v-layout>


      </v-flex>

      <v-flex class="hidden-xs-only " sm4 md3 offset-md1>
          <v-layout row>
            <h6 class="primary--text">USD Exchange Rate</h6>
          </v-layout>
        <v-layout row class="mb-4">
          <v-flex>
              <v-flex>
                Bitcoin <v-spacer></v-spacer> {{ btc |  usd }}
              </v-flex>
              <v-flex>
                Etherium <v-spacer></v-spacer>  {{ eth | usd }}
              </v-flex>
              <v-flex>
                Litecoin <v-spacer></v-spacer>  {{ ltc | usd }}
              </v-flex>

          </v-flex>
        </v-layout>

        <v-layout row class="mb-0">
          <h6 class="primary--text">Weekly Newsletter</h6>
        </v-layout>

        <v-layout row class="mt-0 mb-2">
          <v-flex xs10>
            <form @submit.prevent="onCreateContent">
            <v-text-field class="mb-0" name="email" label="E-mail" id="email" v-model="email"></v-text-field>
            <v-btn class="primary mt-0" :disabled="!formIsValid" type="Submit">Subscribe</v-btn>
            </form>
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
        btc: '',
        eth: '',
        ltc: '',
        email: '',
        contents: []
      }
    },
    computed: {
      formIsValid () {
        return this.email !== ''
      },
      editors () {
        return this.$store.getters.editContents
      }
    },
    mounted () {
      let artRef = firebase.database().ref('Articles')
      artRef.on('child_added', snap => {
        this.contents.push(snap.val())
        // console.log(this.contents)
      })
      setInterval(this.load, 1000)
    },
    methods: {
      load () {
        fetch('https://www.coincap.io/page/ETH').then(res => res.json()).then(rest => {
          this.eth = rest.price_usd
        })
        fetch('https://www.coincap.io/page/BTC').then(res => res.json()).then(rest => {
          this.btc = rest.price_usd
        })
        fetch('https://www.coincap.io/page/LTC').then(res => res.json()).then(rest => {
          this.ltc = rest.price_usd
        })
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
