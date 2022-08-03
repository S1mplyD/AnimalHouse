<template lang="en">
<body class="bodymain">
<ServiziHeaderVue />
<section class="body">
<form>
  <div class="form-group">
    <label for="selectservice">List of our services</label>
    <select class="form-control" id="selectservice" v-model="selected">
      <option v-for="option in options" :value="option.value">
    {{ option.text }}
      </option>
    </select>
  </div>
  <br>
  <div class="form-group">
    <label for="Location">Location.</label>
    <input type="email" class="form-control" id="Location" placeholder="Enter your location">
  </div>
  <br>
  <router-link to="/servizi/selection"><a class="btn btn-success" role="button">Go to see the choices you have near you!</a></router-link>
</form>
</section>
<SiteFooterVue />
</body>
</template>

<script>
// @ is an alias to /src
import ServiziHeaderVue from '@/components/headers/ServiziHeader.vue'
import SiteFooterVue from '@/components/SiteFooter.vue'

export default {
  name: 'ServiziPage',
  components: {
    ServiziHeaderVue,
    SiteFooterVue
  },
  data () {
    return {
      selected: '',
      options: [
        { text: 'Select our services', value: '' },
        { text: 'Pet Boarding', value: 'boarding' },
        { text: 'Products shop', value: 'shop' },
        { text: 'Pet Spa', value: 'spa' },
        { text: 'Pet Training Facility', value: 'training' }
      ]
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
