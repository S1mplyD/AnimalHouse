<template>
 <ForumHeaderVue />
 <SiteFooterVue />
</template>

<script>
// @ is an alias to /src
import ForumHeaderVue from '@/components/headers/ForumHeader.vue'
import SiteFooterVue from '@/components/SiteFooter.vue'
export default {
  name: 'ForumPage',
  components: {
    ForumHeaderVue,
    SiteFooterVue
  }
}
</script>

<style lang="scss">
  .forum {
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
