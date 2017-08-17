<template>
<v-container>
  <v-layout row>
    <v-flex xs12>
      <h4 class="secondary--text"> Create New Article </h4>
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <form @submit.prevent="onCreateArticle">
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field name="link" label="Link" id="link" v-model="link" required></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field name="title" label="Title" id="title" v-model="title" required></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field name="author" label="Author" id="author" v-model="author" required></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field name="publication" label="Publication" id="publication" v-model="publication" required></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field name="description" label="Description" id="description" v-model="description" multi-line required></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field name="imageUrl" label="Image URL" id="image-url" v-model="imageUrl"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <img :src="imageUrl" height=200px></img>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-btn class="primary" :disabled="!formIsValid" type="Submit">Create Content</v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        author: '',
        publication: '',
        link: '',
        imageUrl: '',
        description: ''
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' && this.link !== '' && this.description !== '' && this.author !== '' && this.publication !== ''
      }
    },
    methods: {
      onCreateArticle () {
        if (!this.formIsValid) {
          return
        }
        const contentData = {
          title: this.title,
          link: this.link,
          imageUrl: this.imageUrl,
          description: this.description,
          author: this.author,
          publication: this.publication,
          date: new Date()
        }
        this.$store.dispatch('createArticle', contentData)
        this.$router.push('/list')
      }
    }
  }
</script>
