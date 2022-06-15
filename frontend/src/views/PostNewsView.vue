<template lang="it">
<body class="bodymain">
 <div>
  <NewsPageComponent />
  <NewsComponent />
 </div>
 </body>
</template>

<script>
import NewsComponent from '../components/news/NewsComponent.vue'
import NewsPageComponent from '../components/news/NewsPageComponent.vue'

export default {
  name: 'PostView',
  components: {
    NewsPageComponent,
    NewsComponent
  }
}
</script>
