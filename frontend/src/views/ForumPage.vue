<template lang="en">
 <ForumHeaderVue />
 <ForumComponent/>
 <PostComponent />
 <SiteFooterVue/>
</template>

<script>
// @ is an alias to /src
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
