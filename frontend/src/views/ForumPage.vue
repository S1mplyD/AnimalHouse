<template lang="en">
 <ForumHeaderVue />
 <ForumComponent class="forum-view"/>
 <SiteFooterVue/>
</template>

<script>
// @ is an alias to /src
import ForumHeaderVue from '@/components/headers/ForumHeader.vue'
import ForumComponent from '@/components/forum/ForumComponent.vue'
import SiteFooterVue from '@/components/SiteFooter.vue'
export default {
  name: 'ForumPage',
  components: {
    ForumHeaderVue,
    ForumComponent,
    SiteFooterVue
  }
}
</script>

<style lang="scss">
  .forum {
    display: flex;
    background-image: url("../assets/istockphoto-517188688-612x612.jpg");
    height: 800px;
    padding: .5rem 1rem;
    background-size: cover;

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
