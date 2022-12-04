<template>
<header>
  <img alt="Logo of Animal House" src="@/assets/logo.png" height="50">
    <b><p>ANIMAL HOUSE</p></b>
    <nav>
      <ul>
        <li><router-link to="/" class="routerlink">Go back to the HOMEPAGE</router-link></li>
        </ul>
    </nav>
    <nav v-if="user.length === 1" id="usersection">
      <div class="card mb-3" style="background: rgb(60, 121, 150); width: 500px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="user[0].profilePicture" class="img-fluid rounded-start" alt="" style="max-height: 100px; object-fit:cover;"/>
          </div>
          <div class="col-md-8" style="background: rgb(60, 121, 150);">
            <div class="card-body">
              <h5 class="card-title"><b>{{user[0].username}}</b></h5>
            </div>
              <router-link to="/test/" class="card-link" v-if="user[0].admin === true">Testarea</router-link>
              <router-link to="/backoffice/" class="card-link" v-if="user[0].admin === true">Backoffice</router-link>
              <router-link to="/user" class="card-link">User Area</router-link>
              <a href="/auth/logout" class="card-link">Logout</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <body class="bodymain">
  <h1>Welcome to your Cart!</h1>
  <div class="overflow-auto" id="shop-section">
    <div v-for="(item, index) in cart" :key="index">
      <div class="card mb-3" style="width: 700px; height: 260px;" id="card">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="item.mainPhoto" class="img-fluid rounded-start" style="object-fit: cover; height: 250px;" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">You have {{ item.quantity }} of this item in your cart.</p>
              <p class="card-text"><small>Sold at: ${{ item.price }}</small></p>
              <p class="card-text" v-show="item.price > item.discountedPrice"><small class="text-muted">Discounted: ${{ item.discountedPrice }}</small></p>
              <button @click="removeFromCart(item)" class="btn btn-primary">Remove from the Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
<SiteFooter />
</template>
<script>
import axios from 'axios'
import SiteFooter from '../SiteFooter.vue'
import Swal from 'sweetalert2'
export default {
  name: 'CartList',
  data () {
    return {
      cart: [],
      user: [],
      totalPrice: null,
      totalDiscount: null
    }
  },
  mounted () {
    axios.get('/auth/isAuthenticated')
      .then((response) => {
        this.user.push(response.data)
        console.log(this.user.length)
      })
    axios.get('/api/carts')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i])
          this.cart.push(response.data[i])
        }
      })
  },
  components: { SiteFooter },
  methods: {
    async removeFromCart (item) {
      const { value: text } = await Swal.fire({
        customClass: { confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger' },
        title: 'How many items do you want to delete?',
        icon: 'question',
        input: 'text',
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Go back'
      })

      if (text < item.quantity) {
        axios.delete('/api/carts', {
          params: {
            id: item._id,
            quantity: text
          }
        }).then((res) => {
          Swal.fire(`You removed ${text} items of this type from your cart!`)
        })
      } else if (text >= item.quantity) {
        axios.delete('/api/carts', {
          params: {
            id: item._id,
            quantity: text
          }
        }).then((res) => {
          Swal.fire('You removed all items of this type from your cart!')
        })
      }
    }
  }
}
</script>
<style lang="scss">
#shop-section{
    max-height: 700px;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    border-style: none;
  }
#shop-section::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}
</style>
