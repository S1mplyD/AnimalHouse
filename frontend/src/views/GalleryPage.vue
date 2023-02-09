<template class="gallery-main" lang="en">
  <GalleryHeader /> <!--Per i commenti sull'header, si vada nel file .vue dell'header stesso -->
  <div class="gallery" v-if="gallery.length > 0"> <!--Si caricano le immagini con i loro dati "anagrafici" in una card realizzata mediante Bootstrap -->
    <div class="gallery-panel" v-for="photo in gallery" :key="photo._id">
      <div class="card">
        <img :src="photo.filename" class="card-img-top" alt=""/>
        <div class="card-body">
          <h5 class="card-title" v-if="photo.title">{{ photo.title }}</h5>
          <p class="card-text" v-if="photo.location">{{ photo.location }}</p>
          <p class="card-text" v-if="photo.photographer">
            {{ photo.photographer.name }}
          </p>
          <p class="card-text" v-if="photo.source">
            via {{ photo.source.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="gallery"> <!--Se non ci sono immagini, viene caricata un'immagine di emergenza -->
    <div class="card">
        <img src="@/assets/Photo-Unavailable.jpg" class="card-img-top" alt=""/>
        <div class="card-body">
          <h5 class="card-title">Photo unavailable</h5>
          <p class="card-text">Excuse us for the matter</p>
        </div>
      </div>
  </div>
  <SiteFooter /> <!--Il footer è sempre lo stesso -->
</template>

<script>
import GalleryHeader from '@/components/headers/GalleryHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import axios from 'axios'
export default {
  name: 'GalleryPage',
  mounted () {
    axios.get('/api/gallery') /* Chiamata API con axios per ottenere le immagini per la galleria */
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          this.gallery.push(response.data[i])
        }
      })
  },
  components: {
    GalleryHeader,
    SiteFooter
  },
  data () {
    return {
      gallery: []
    }
  }
}
</script>
<style lang="scss">
.card-link {
    color:#09ff00;
    &:hover{
      color:#a6ff00;
    }
  }
</style>
