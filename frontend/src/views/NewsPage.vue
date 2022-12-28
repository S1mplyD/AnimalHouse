<template lang="en">
<NewsHeaderVue />
<SiteFooterVue/>
</template>

<script>
import NewsHeaderVue from '@/components/headers/NewsHeader.vue'
import SiteFooterVue from '@/components/SiteFooter.vue'
export default {
  name: 'NewsPage',
  components: {
    NewsHeaderVue,
    SiteFooterVue
  }
}
</script>

<style lang="scss">
  .news {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding: .5rem 1rem;

    p {
      margin-left: 1rem;
    }
  }

  nav {
    margin-left: auto;

    ul {
      list-style: none;
    }

    ul li {
      display: inline-flex;
      margin-left: 1rem;
    }
  }
  .cr{
    bottom: 3px;
  }
</style>>
