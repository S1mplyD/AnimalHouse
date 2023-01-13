<template lang="en">
  <h1>Welcome to our Forum!</h1>
  <div class="overflow-auto" id="forum">
    <div class="row row-cols-1 row-cols-md-2" v-for="post in posts" :key="post._id">
      <div class="col">
      <router-link :to="'/forum/' + post._id">
          <div class="card" style="width: 700px; height:260px" id="card">
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
</template>
<script>
import axios from 'axios'

export default {
  name: 'ForumComponent',
  mounted () {
    axios.get('/api/posts')
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
  }
  #forum ul {
    list-style: none;
  }
  #card {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
