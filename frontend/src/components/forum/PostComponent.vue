<template lang="it">
  <div class="lightbox" @click.self="closeLightbox">

    <div class="lightbox-info">
      <div class="lightbox-info-inner">
        <p v-if="post.title">{{ post.title }}</p>

        <p v-if="post.post">{{ post.post }}</p>

      </div>
    </div>

  </div>
</template>
<script>
import posts from '@/posts.json'

export default {
  name: 'PostComponent',
  data () {
    return {
      posts
    }
  },
  computed: {
    post () {
      return this.posts.find((post) => {
        return post.id === Number(this.$route.params.id)
      })
    }
  },
  methods: {
    closeLightbox () {
      this.$router.push('/forum')
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

  .lightbox-info {
    margin: auto 2rem auto 0;
  }

  .lightbox-info-inner {
    background-color: #FFFFFF;
    display: inline-block;
    padding: 2rem;
    border-radius: 0.75rem;
  }
</style>
