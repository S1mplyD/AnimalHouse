<template class="gallery-main" lang="en">
<body class="bodymain">
  <GalleryHeader />
  <div class="gallery">
    <div class="gallery-panel" v-for="photo in gallery">
      <div v-if="photo" class="card">
        <img :src="photo.filename" class="card-img-top" alt=""/>
        <div class="card-body">
          <h5 class="card-title" v-if="photo.title">{{ photo.title }}</h5>
          <p class="card-text" v-if="photo.location">{{ photo.location }}</p>
          <a class="card-link" rel="nofollow" :href="photo.photographer.url">
            {{ photo.photographer.name }}
          </a>
          <p class="card-text" v-if="photo.source">
            via
            <a class="card-link" rel="nofollow" :href="photo.source.url">
              {{ photo.source.name }}
            </a>
          </p>
        </div>
      </div>
      <div v-else class="card">
        <img src="@/assets/Photo-Unavailable.jpg" class="card-img-top" alt=""/>
        <div class="card-body">
          <h5 class="card-title">Photo unavailable</h5>
          <p class="card-text">Excuse us for the matter</p>
        </div>
      </div>
    </div>
  </div>
  <SiteFooter />
</body>
</template>

<script>
import GalleryHeader from '@/components/headers/GalleryHeader.vue'
import ResultsComponent from '@/components/gallery/ResultsComponent.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import axios from 'axios'
export default {
  name: 'GalleryPage',
  mounted () {
    axios.get('/api/gallery')
      .then((response) => {
        console.log(response.data)
        this.gallery.push(response.data)
      })
  },
  components: {
    GalleryHeader,
    ResultsComponent,
    SiteFooter
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
