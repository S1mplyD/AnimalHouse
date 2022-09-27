<template class="gallery-main" lang="en">
<body class="bodymain">
  <GalleryHeader />
  <ResultsComponent class="gallery-view"/>
  <SiteFooter />
</body>
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
