<template lang="en">
<body class="bodymain">
<ShopHeaderVue />
<h1>Welcome to our shop!</h1>
<div class="shop-section">
  <div v-for="(item, index) in products" :key="index">
    <div class="card mb-3">
      <div class="col-md-4">
        <img :src="item.mainPhoto" class="img-fluid rounded-start" id="item-image" alt="..."/>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h1 class="card-title">{{ item.title }}</h1>
          <p class="card-text">{{ item.info }}</p>
          <p class="card-text">Sold by{{ item.seller }}</p>
          <p class="card-text">${{ item.price }}</p>
          <p v-show="item.price >= item.discountedPrice" class="card-text">${{ item.discountedPrice}}</p>
        </div>
        <router-link to="/cart" class="routerlink">Add to cart</router-link>
      </div>
    </div>
  </div>
</div>
<SiteFooterVue />
</body>
</template>

<script>
import ShopHeaderVue from '@/components/headers/ShopHeader.vue'
import SiteFooterVue from '@/components/SiteFooter.vue'
import axios from 'axios'
export default {
  name: 'ShopPage',
  data () {
    return {
      products: []
    }
  },
  mounted () {
    axios.get('/api/products')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i])
          if (i < 5) {
            this.products.push(response.data[i])
          }
        }
      })
  },
  components: {
    ShopHeaderVue,
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
  #item-image{
  max-height: 100px;
  object-fit: cover;
}

</style>>
