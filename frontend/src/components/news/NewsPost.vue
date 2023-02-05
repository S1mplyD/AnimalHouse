<template lang="en"> <!-- Questo codice è del tutto identico a quello del post, a cui è stato rimosso il codice per i commenti e le replies -->
    <div v-for="post in posts" class="lightbox" @click.self="closeLightbox">
      <div class="lightbox-info">
       <div class="card text-center" style="width: 700px; min-height:260px; max-height: 700px">
        <div class="card-body">
            <h5 v-if="post.title && post.user" class="card-title"><b>{{ post.title }} by {{ post.user }}</b></h5>
            <p v-if="post.post" class="card-text">{{ post.post }}</p>
            <p v-if="post.date" class="card-text"><small class="text-muted">{{ post.date }}</small></p>
            <div class="overflow-auto" id="comms">
             <img :src="post.photo" class="card-img-bottom" alt="...">
            </div>
        </div>
       </div>
      </div>
    </div>
  </template>
<script>
import axios from 'axios'
export default {
  name: 'NewsPost',
  mounted () {
    axios.get('/api/news') /** Chiamata API per ottenere la notizia giusta, eseguita mediante axios */
      .then((response) => {
        console.log(this.$route.params.id)
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i]._id === this.$route.params.id) {
            this.posts.push(response.data[i])
          }
        }
      })
  },
  data () {
    return {
      posts: []
    }
  },
  methods: {
    closeLightbox () {
      this.$router.push('/news')
    }
  }
}
</script>

  <style>
    .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 2rem;
    }
    #comms {
      max-height: 200px;
      -ms-overflow-style: none; /* for Internet Explorer, Edge */
      scrollbar-width: none; /* for Firefox */
      border-style: none;
    }

    #comms::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
    }
    .lightbox-info {
      margin: auto 2rem auto 0;
      position: fixed;
      top: 5%;
      left: 33%;
    }

  </style>
