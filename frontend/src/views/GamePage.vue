<template lang="it">
<GamesHeaderVue />
<SiteFooterVue/>
</template>

<script>
import GamesHeaderVue from '@/components/headers/GamesHeader.vue'
import SiteFooterVue from '@/components/SiteFooter.vue'
export default {
  name: 'GameView',
  components: {
    GamesHeaderVue,
    SiteFooterVue
  }
}
</script>

<style lang="scss">
  .giochi {
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
