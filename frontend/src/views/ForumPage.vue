<template>
  <html lang="en">
  <header>
    <ForumHeaderVue /> <!--Per i commenti sull'header, si vada nel file .vue dell'header stesso -->
  </header>
 <ForumComponent/> <!--Per i commenti sul contenuto del Forum, si vada nel file .vue corretto -->
 <PostComponent /> <!--Per i commenti sui singoli post, si vada nel file .vue corretto -->
 <SiteFooterVue/> <!--Il footer è uguale per tutte le pagine -->
 </html>
</template>

<script>
import ForumHeaderVue from '@/components/headers/ForumHeader.vue'
import ForumComponent from '@/components/forum/ForumComponent.vue'
import PostComponent from '@/components/forum/PostComponent.vue'
import SiteFooterVue from '@/components/SiteFooter.vue'
export default {
  name: 'ForumPage',
  components: {
    ForumHeaderVue,
    ForumComponent,
    PostComponent,
    SiteFooterVue
  }
}
</script>
