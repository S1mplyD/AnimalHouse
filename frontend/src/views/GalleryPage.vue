<template class="gallery-main" lang="it">
  <GalleryHeader />
  <ResultsComponent class="gallery-view"/>
  <SiteFooter />
</template>

<script>
import GalleryHeader from '@/components/headers/GalleryHeader.vue'
import ResultsComponent from '@/components/gallery/ResultsComponent.vue'
import SiteFooter from '@/components/SiteFooter.vue'
export default {
  name: 'GalleryPage',
  components: {
    GalleryHeader,
    ResultsComponent,
    SiteFooter
  }
}
</script>
