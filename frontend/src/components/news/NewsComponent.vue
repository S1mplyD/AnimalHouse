<template lang="en"> <!-- La pagina delle news è molto simile a quella del forum, con la differenza che non è possibile aggiungere news se si è utenti regolari. VI è la possibilità di ricercare i post con il titolo, però. -->
    <h1 style="color:black;">Welcome to our Newspage!</h1>
    <div class="overflow-auto" id="news">
      <form>
        <label for="texttitle" class="form-label" style="color:white;">Do you want to search a specific news article?</label>
        <input id="texttitle" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button type="button" class="btn btn-primary" @click="searchNews()">Search</button> <!-- Ricerca delle news usando il titolo della news.-->
      </form>
      <div v-if="searched.length === 0" class="container d-flex flex-wrap"> <!-- Nel caso non ci siano ricerche fatte, si caricano tutte le news.-->
        <div class="row" v-for="post in posts" :key="post._id">
          <div class="col">
            <router-link :to="'/news/' + post._id">
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
      <div v-if="searched.length > 0" class="container d-flex flex-wrap"> <!-- Se ci sono ricerche fatte, si visualizzano solo le news con il titolo cercato -->
        <div class="row" v-for="item in searched" :key="item._id">
          <div class="col">
            <router-link :to="'/news/' + item._id">
              <div class="card" style="width: 700px; height:260px" :id="'card' + item._id">
                <div class="card-body">
                  <h5 class="card-title"><b>{{ item.title }}</b> by {{ item.user }}:</h5>
                  <p class="card-text">{{ item.post_summary }}</p>
                  <p class="card-text"><small class="text-muted">{{ item.date }}</small></p>
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
  name: 'NewsComponent',
  mounted () {
    axios.get('/api/news') /** Chiamata API che permette di caricare le news, mediante axios */
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
      searched: [],
      displayCompletePost: false
    }
  },
  methods: {
    searchNews: async function () { /** Questa funzione fa si che l'array searched si riempia, così che si visualizzino solo le news ricercate */
      this.searched = []
      const newsTitle = document.getElementById('texttitle').value
      for (let i = 0; i < this.posts.length; i++) {
        if (this.posts[i].title === newsTitle) this.searched.push(this.posts[i])
      }
    }
  }
}
</script>

<style>
#news {
  display: flex;
  background-image: url("../../assets/istockphoto-517188688-612x612.jpg");
  height: 800px;
  padding: .5rem 1rem;
  background-size: cover;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  border-style: none;
}
#news::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}
#news ul {
  list-style: none;
}
.card[id^="card"] {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
