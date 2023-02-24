<template>
  <html lang="en">
 <NewsHeader /> <!--Per i commenti sull'header, si vada nel file .vue dell'header stesso -->
 <NewsComponent /> <!--Per i commenti sul contenuto del Forum, si vada nel file .vue corretto -->
 <NewsPost /> <!--Per i commenti sui singoli post, si vada nel file .vue corretto -->
 <SiteFooter /> <!--Il footer è uguale per tutte le pagine -->
 </html>
</template>

<script>
import NewsComponent from '@/components/news/NewsComponent.vue'
import NewsPost from '@/components/news/NewsPost.vue'
import NewsHeader from '@/components/headers/NewsHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'

export default {
  name: 'NewsPage',
  components: {
    NewsHeader,
    NewsComponent,
    NewsPost,
    SiteFooter
  }
}
</script>
