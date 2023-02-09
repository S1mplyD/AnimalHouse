<template lang="en">
<ShopHeaderVue /> <!--Per i commenti sull'header, si vada nel file .vue dell'header stesso -->
<h1 style="color:black;">Welcome to our shop!</h1>
<div class="overflow-auto" id="shop-section">
  <!--Di seguito vengono caricati tutti i prodotti dello shop all'interno di card realizzate mediante Bootstrap -->
  <div v-for="(item, index) in products" :key="index">
    <div class="card mb-3" style="width: 700px; height: 260px;" :id="'card' + index">
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="item.mainPhoto" class="img-fluid rounded-start" style="object-fit: cover; height: 250px;" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">{{ item.info }}</p>
            <p class="card-text">Sold by {{ item.seller }}</p>
            <p class="card-text"><small>Sold at: ${{ item.price }}</small></p>
            <p class="card-text" v-show="item.price > item.discountedPrice"><small class="text-muted">Discounted: ${{ item.discountedPrice }}</small></p>
            <button @click="addToCart(item)" class="btn btn-primary">Add to Cart</button> <!--Questo tasto è utilizzato per aggiungere al carrello i prodotti scelti da acquistare -->
          </div>
        </div>
      </div>
    </div>
    <br>
  </div>
</div>
<SiteFooterVue />
</template>

<script>
import ShopHeaderVue from '@/components/headers/ShopHeader.vue'
import SiteFooterVue from '@/components/SiteFooter.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'ShopPage',
  data () {
    return {
      products: []
    }
  },
  mounted () {
    axios.get('/api/products') /* Chiamata API mediante axios che permette di caricare i prodotti */
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          this.products.push(response.data[i])
        }
      })
  },
  components: {
    ShopHeaderVue,
    SiteFooterVue
  },
  methods: {
    async addToCart (item) { /* Funzione che permette, mediante una chiamata API con axios, di spostare il prodotto scelto nel carrello */
      axios.post('/api/carts', null, {
        params: {
          productid: item._id
        }
      }).then((res) => {
        Swal.fire({ /* Qui compare un alert che avverte dell'avvenuta aggiunta al carrello dell'oggetto scelto */
          position: 'top',
          icon: 'success',
          title: 'You added the item to the cart successfully!',
          showConfirmButton: true
        })
          .then((response) => {
            if (response.isConfirmed) location.reload()
          })
      })
    }
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
#shop-section{
    background-image: url("../assets/istockphoto-517188688-612x612.jpg");
    height: 800px;
    background-size: cover;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    border-style: none;
  }
#shop-section::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}
div[id^="card"] {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

</style>>
