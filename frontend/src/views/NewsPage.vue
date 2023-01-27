<template lang="en">
 <NewsHeader />
 <NewsComponent />
 <NewsPost />
 <SiteFooter />
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
