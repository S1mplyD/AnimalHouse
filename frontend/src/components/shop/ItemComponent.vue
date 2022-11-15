<template lang="en">
  <div class="lightbox" @click.self="closeLightbox">
    <div class="lightbox-info">
      <div class="lightbox-info-inner">
        <p v-if="item.title"><b>{{ item.title }}</b> <br> {{item.price}}</p>
        <p v-if="item.info">{{ item.info }}</p>
      </div>
    </div>

  </div>
</template>
<script>
import products from '@/shop.json'

export default {
  name: 'ItemComponent',
  data () {
    return {
      products
    }
  },
  computed: {
    item () {
      return this.products.find((item) => {
        return item.id === Number(this.$route.params.id)
      })
    }
  },
  methods: {
    closeLightbox () {
      this.$router.push('/shop')
    }
  }
}
</script>

<style>
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .lightbox-info {
    margin: auto 2rem auto 0;
  }

  .lightbox-info-inner {
    font-size: 200%;
    transform: translate(110%, 5%);
    background-color: #FFFFFF;
    display: inline-block;
    padding: 2rem;
    border-radius: 0.75rem;
  }
</style>
