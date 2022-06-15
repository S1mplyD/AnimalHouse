<template lang="it">
  <div class="lightbox" @click.self="closeLightbox">

    <div class="lightbox-info">
      <div class="lightbox-info-inner">
        <p v-if="post.title"><b>{{ post.title }}</b> by {{post.user}}</p>
        <p v-if="post.post">{{ post.post }}</p>
        <p v-if="post.date">Post date: {{ post.date }}</p>
      </div>
    </div>

  </div>
</template>
<script>
import news from '@/news.json'

export default {
  name: 'PostComponent',
  data () {
    return {
      news
    }
  },
  computed: {
    post () {
      return this.news.find((post) => {
        return post.id === Number(this.$route.params.id)
      })
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
  }

  .lightbox-info {
    margin: auto 2rem auto 0;
  }

  .lightbox-info-inner {
    font-size: 200%;
    transform: translate(110%, -40%);
    background-color: #FFFFFF;
    display: inline-block;
    padding: 2rem;
    border-radius: 0.75rem;
  }
</style>
