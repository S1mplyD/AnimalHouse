<template lang="en">
  <div class="gallery">
    <div class="gallery-panel"
    v-for="photo in gallery"
    :key="photo.id">
      <img v-if="photo" :src="photo.filename" alt="">
      <img v-else src="@/assets/Photo-Unavailable.jpg" alt=""/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ResultsComponent',
  mounted () {
    axios.get('/api/gallery')
      .then((response) => {
        console.log(response.data)
        this.gallery.push(response.data)
      })
  },
  data () {
    return {
      gallery: []
    }
  }
}
</script>

<style>

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: 1rem;
    max-width: 80rem;
    margin: 5rem auto;
    padding: 0 5rem;
  }

  .gallery-panel img {
    width: 100%;
    height: 22vw;
    object-fit: cover;
    border-radius: 0.75rem;
  }
</style>
