<template lang="en">
  <h1>Welcome to our Forum!</h1>
  <div class="forum">
    <ul>
      <li v-for="post in posts">
        <div class="card h-100" id="card">
          <div class="card-body">
            <h5 class="card-title"><b>{{ post.title }}</b> by {{ post.user }}:</h5>
            <p class="card-text">{{ post.post_summary }}</p>
            <p class="card-text"><small class="text-muted">{{ post.date }}</small></p>
          </div>
        </div>
      </li>
    </ul>
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
  .forum ul {
    list-style: none;
  }
  .postinfo{
    display: flex;
    border: 1px solid rgb(3, 3, 3);
    background-color: rgb(117, 117, 117);
    padding: .5rem 1rem;
    font-size: large;
    border-radius: 0.75rem;
  }
  #card{
  width: 450px;
  height: 450px;
}
</style>
