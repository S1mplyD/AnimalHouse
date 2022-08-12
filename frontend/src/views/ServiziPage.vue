<template lang="en">
<body class="bodymain">
<ServiziHeaderVue />
<section class="body">
 <form>
  <div class="form-group">
    <label for="name">Name of the service</label>
    <br>
    <input type="text" v-model="name" class="form-control" id="name" placeholder="Enter the name of the service you are looking for">
    <br>
    <label for="selectservice">List of our services</label>
    <br>
    <select v-model="selected" class="form-control" id="selectservice">
      <option v-for="option in options" :value="option.value">
    {{ option.text }}
      </option>
    </select>
  </div>
  <br>
  <div class="form-group">
    <label for="Location">Location</label>
    <br>
    <input type="text" v-model="search" class="form-control" id="Location" placeholder="Enter your location">
  </div>
  <br>
  </form>
  <div class="overflow-auto" id="servicediv">
    <ul class="services">
      <li v-for="service in filteredServices">
        <div  class="card">
          <div class="card-body">
              <h5 class="card-title">{{service.name}}</h5>
              <p class="card-text">{{service.info}}</p>
          </div>
        </div>
        <br>
     </li>
    </ul>
</div>
</section>
<SiteFooterVue />
</body>
</template>

<script>
// @ is an alias to /src
import ServiziHeaderVue from '@/components/headers/ServiziHeader.vue'
import SiteFooterVue from '@/components/SiteFooter.vue'
import services from '@/services.json'

export default {
  name: 'ServiziPage',
  components: {
    ServiziHeaderVue,
    SiteFooterVue
  },
  data () {
    return {
      services,
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
  },
  computed: {
    filteredServices: function () {
      const filterType = this.selected
      const searchedLoc = this.search
      const nameService = this.name
      return this.services.filter((service) => {
        let filtered = true
        if (filterType && filterType.length > 0) {
          filtered = service.type === filterType
        }
        if (filtered) {
          if (searchedLoc && searchedLoc.length > 0) {
            filtered = service.location === searchedLoc
          }
        }
        if (filtered) {
          if (nameService && nameService.length > 0) {
            filtered = service.name === nameService
          }
        }
        return filtered
      })
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
  #servicediv{
    max-height: 500px;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    border-style: double;
  }
  .services{
    list-style: none;
  }
#servicediv::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}

</style>>
