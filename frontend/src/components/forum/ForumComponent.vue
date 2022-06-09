<template lang="it">
  <h1>Post del forum</h1>
  <div class="forum">
    <ul>
      <li>
        <div v-for="post in posts" :key="post.id" class="postinfo">
          <router-link :to="`/forum/${post.id}`" class="routerlink"> <p>{{post.title}}</p> </router-link>
          <p>{{post.post_summary}}</p>
        </div>
     </li>
    </ul>
  </div>
</template>

<script>
import posts from '@/posts.json'

export default {
  name: 'ForumComponent',
  data () {
    return {
      posts
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
</style>
