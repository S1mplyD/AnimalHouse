<template>
  <CartHeader />
  <body class="bodymain"> <!-- Qui viene gestito il cart personale dell'utente -->
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
              <button @click="removeFromCart(item)" class="btn btn-primary">Remove from the Cart</button> <!-- Tasto per rimuovere l'item dal cart -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p> Total price of the items in the cart: <b>${{ this.totalPrice }}</b>. Discounted at: <b>${{ this.totalDiscount }}</b>. You can save <b>${{ this.totalPrice - this.totalDiscount }}.</b></p> <!-- Prezzo totale, con sconto totale, e quantità di denaro risparmiato.-->
  <div class="d-grid gap-2 d-md-flex justify-content-md-center">
   <button type="button" class="btn btn-primary"><b>Proceed to buy the items</b></button> <!-- Bottone per comprare il contenuto del cart. AVVERTENZA: è solo a scopo dimostrativo. Non è funzionante. -->
  </div>
</body>
<SiteFooter />
</template>
<script>
import axios from 'axios'
import CartHeader from '../headers/CartHeader.vue'
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
    axios.get('/auth/isAuthenticated') /** Chiamata API per controllare se l'utente ha fatto l'accesso */
      .then((response) => {
        this.user.push(response.data)
        console.log(this.user.length)
      })
    axios.get('/api/carts')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) { /** Chiamata API che ottiene il contenuto del cart per quell'utente */
          console.log(response.data[i])
          this.cart.push(response.data[i])
        }
      })
    for (let i = 0; i < this.cart.length; i++) { /** Calcolo del totale dei prezzi e dello sconto */
      this.totalPrice += this.cart[i].price
      this.totalDiscount += this.cart[i].discountedPrice
    }
  },
  components: { CartHeader, SiteFooter },
  methods: {
    async removeFromCart (item) { /** Funzione cje permette di eliminare un  */
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
          Swal.fire({
            icon: 'success',
            title: `You removed ${text} items of this type from your cart!`,
            showConfirmButton: true
          })
            .then((response) => {
              if (response.isConfirmed) location.reload()
            })
        })
      } else if (text >= item.quantity) {
        axios.delete('/api/carts', {
          params: {
            id: item._id,
            quantity: text
          }
        }).then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'You removed all items of this type from your cart!',
            showConfirmButton: true
          })
            .then((response) => {
              if (response.isConfirmed) location.reload()
            })
        })
      }
    }
  }
}
</script>
<style lang="scss">
header {
    display: flex;
    border-bottom: 1px solid rgb(3, 3, 3);
    background-color: rgb(41, 109, 64);
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
  #loginsection {
    margin-right: auto;
  }
  #profilePicture {
    margin-right: auto;
  }
  #profilePicture{
    width: 50px ;
    height: 50px;
  }
  .card-link {
    color:#09ff00;
    &:hover{
      color:#a6ff00;
    }
  }
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
