<template lang="en">
<body class="bodymain">
<ShopHeaderVue />
<ShopComponent />
<SiteFooterVue />
</body>
</template>

<script>
import ShopHeaderVue from '@/components/headers/ShopHeader.vue'
import ShopComponent from '@/components/shop/ShopComponent.vue'
import SiteFooterVue from '@/components/SiteFooter.vue'
export default {
  name: 'ShopPage',
  components: {
    ShopHeaderVue,
    ShopComponent,
    SiteFooterVue
  }
}
</script>

<style lang="scss">
  .shop {
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
