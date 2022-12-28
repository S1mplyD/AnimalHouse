<template lang="en">
<ServiziHeaderVue />
<section class="body">
  <div class="form-group">
    <p>PLACEHOLDER</p>
  </div>
  <br>
</section>
<SiteFooterVue />
</template>

<script>
// @ is an alias to /src
import ServiziHeaderVue from '@/components/headers/ServiziHeader.vue'
import SiteFooterVue from '@/components/SiteFooter.vue'
import axios from 'axios'

export default {
  name: 'SelectionPage',
  mounted () {
    axios.get('https://site212211.tw.cs.unibo.it/api/services')
      .then((response) => {
        this.services = response.data
      })
  },
  components: {
    ServiziHeaderVue,
    SiteFooterVue
  },
  data () {
    return {
      services: [],
      selected: '',
      name: '',
      options: [
        { text: 'Pet Boarding', value: 'boarding' },
        { text: 'Products shop', value: 'shop' },
        { text: 'Pet Spa', value: 'spa' },
        { text: 'Pet Training Facility', value: 'training' }
      ],
      search: ''
    }
  }
}
</script>

<style lang="scss">
  .servizi {
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
