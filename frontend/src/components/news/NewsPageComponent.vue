<template lang="it">
  <h1>Welcome to our Forum!</h1>
  <div class="news">
    <ul>
      <li>
        <div v-for="post in news" :key="post.id" class="newsinfo">
          <router-link :to="`/news/${post.id}`" class="routerlink"> <p>{{post.title}} by {{post.user}}</p> </router-link>
          <p>{{post.post_summary}}</p>
        </div>
     </li>
    </ul>
  </div>
</template>

<script>
import news from '@/news.json'

export default {
  name: 'ForumComponent',
  data () {
    return {
      news
    }
  }
}
</script>

<style>
  h1 {
    color:#09ff00;
  }
  .news ul {
    list-style: none;
  }
  .newsinfo{
    display: flex;
    border: 1px solid rgb(3, 3, 3);
    background-color: rgb(117, 117, 117);
    padding: .5rem 1rem;
    font-size: large;
    border-radius: 0.75rem;
  }
</style>
