<template lang="en">
  <h1 style="color:black;">Welcome to our Forum!</h1>
  <div class="overflow-auto" id="forum">
    <form>
      <div class="mb-3">
        <label for="texttitle" class="form-label" style="color:white;">Do you want to create a post?</label>
        <input type="text" class="form-control" id="texttitle" placeholder="Write the title here">
        <textarea type="text" id="textpost" class="form-control" aria-describedby="textComment" placeholder="Write your post content here..." cols="50" rows="10"></textarea>
        <label for="picture" class="form-label" style="color:white;">Do you want to post a picture with your post?</label>
        <input type="file" class="form-control" id="picture" multiple>
      </div>
      <button type="button" class="btn btn-primary" @click="upload()">Submit your post</button> <!-- Questo tasto permette di caricare un post, basandosi sui dati inseriti nel form precedente -->
    </form>
    <div class="container d-flex flex-wrap"> <!-- Qui vengono visualizzati i singoli post. Se vi si clicca sopra, si aprirà la pagina con il post singolo esteso, e i commenti collegati a tale post -->
      <div class="row" v-for="post in posts" :key="post._id">
        <div class="col">
          <router-link :to="'/forum/' + post._id">
            <div class="card" style="width: 700px; height:260px" :id="'card' + post._id">
              <div class="card-body">
                <h5 class="card-title"><b>{{ post.title }}</b> by {{ post.user }}:</h5>
                <p class="card-text">{{ post.post_summary }}</p>
                <p class="card-text"><small class="text-muted">{{ post.date }}</small></p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'ForumComponent',
  mounted () {
    axios.get('/api/posts') /** Qui si fa la chiamata API per ottenere dal server i post, mediante axios.get */
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i])
          this.posts.push(response.data[i])
        }
      })
  },
  data () {
    return {
      posts: [],
      displayCompletePost: false
    }
  },
  methods: {
    upload: async function () { /** Questa funzione viene usata dal tasto per fare l'upload dei post,  e tale funzione fa uso di axios.post per caricare i dati nel server */
      const data = {
        title: document.getElementById('texttitle').value,
        post: document.getElementById('textpost').value
      }
      axios.post('/api/posts', data).then((res) => {
        const images = document.querySelector('#picture')
        const formdata = new FormData()
        for (let i = 0; i < images.files.length; i++) {
          formdata.append('images', images.files[i])
        }
        const id = res.data._id
        axios.post('/api/images/posts', formdata, {
          params: {
            id: id
          }
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res)
          location.reload() /** Viene ricaricata la pagina, così che si possa vedere subito il risultato del caricamento dei post */
        })
      })
    }
  }
}
</script>

<style>
  h1 {
    color:#09ff00;
  }
  #forum {
    display: flex;
    background-image: url("../../assets/istockphoto-517188688-612x612.jpg");
    height: 800px;
    padding: .5rem 1rem;
    background-size: cover;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    border-style: none;
  }
  #forum::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}
  #forum ul {
    list-style: none;
  }
  .card[id^="card"] {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
