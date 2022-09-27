<template lang="en">
  <h1>Welcome to our shop!</h1>
  <div class="shop">
    <ul>
      <li>
        <div v-for="item in shop" :key="shop.id" class="shopinfo">
          <router-link :to="`/shop/${item.id}`" class="routerlink"> <p>{{item.title}} <br> {{item.price}}</p> </router-link>
        </div>
     </li>
    </ul>
  </div>
</template>

<script>
import shop from '@/shop.json'

export default {
  name: 'ShopComponent',
  data () {
    return {
      shop
    }
  }
}
</script>

<style>
  h1 {
    color:#09ff00;
  }
  .shop ul {
    list-style: none;
  }
  .shopinfo{
    display: flex;
    border: 1px solid rgb(3, 3, 3);
    background-color: rgb(117, 117, 117);
    padding: .5rem 1rem;
    font-size: 120%;
    border-radius: 0.75rem;
  }
</style>
