<template lang="en">
<body class="bodymain">
 <div>
  <ResultsComponent />
  <PhotoComponent />
 </div>
 </body>
</template>

<script>
import PhotoComponent from '../components/gallery/PhotoComponent.vue'
import ResultsComponent from '../components/gallery/ResultsComponent.vue'

export default {
  name: 'PhotoView',
  components: {
    PhotoComponent,
    ResultsComponent
  }
}
</script>
