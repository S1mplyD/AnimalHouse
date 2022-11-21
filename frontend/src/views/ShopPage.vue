<template lang="en">
<body class="bodymain">
<ShopHeaderVue />
<h1>Welcome to our shop!</h1>
<NavBar />
<SiteFooterVue />
</body>
</template>

<script>
import ShopHeaderVue from '@/components/headers/ShopHeader.vue'
import NavBar from '@/components/shop/NavBar.vue'
import SiteFooterVue from '@/components/SiteFooter.vue'

import axios from 'axios'
export default {
  name: 'ShopPage',
  mounted () {
    axios.get('/api/products')
      .then((response) => {
        console.log(response.data)
        this.products.push(response.data)
      })
  },
  data () {
    return {
      products: []
    }
  },
  components: {
    ShopHeaderVue,
    NavBar,
    SiteFooterVue
  }
}
</script>

<style lang="scss">
   h1 {
    color:#09ff00;
  }
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
