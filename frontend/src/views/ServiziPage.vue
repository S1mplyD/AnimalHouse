<template lang="en">
<ServiziHeaderVue /> <!--L'header è visibile nella cartella componeents/headers -->
<section class="body">
 <form>
  <div class="form-group">
    <label for="name">Name of the service</label> <!--In questa pagina vengono caricati i servizi presenti, SOLTANTO se sono cercati. Altrimenti si presenta solo il form di ricerca -->
    <br>
    <input type="text" v-model="name" class="form-control" id="name" placeholder="Enter the name of the service you are looking for"> <!--Filtro per il nome -->
    <br>
    <label for="selectservice">List of our services' type</label>
    <br>
    <select v-model="selected" class="form-control" id="selectservice">
      <option value="" disabled selected>Choose the service type</option> <!--Filtro per la tipologia di servizio -->
      <option v-for="option in options" :value="option.value">
    {{ option.text }}
      </option>
    </select>
    <label for="selectservice2">Check if the service is online:</label>
    <br>
    <select v-model="online" class="form-control" id="selectservice2">
      <option value="" disabled selected>Choose if the service is online or not</option> <!--Filtro per controllare se il servizio è online o no -->
      <option v-for="option in options2" :value="option.value">
    {{ option.text }}
      </option>
    </select>
  </div>
  <br>
  <div class="form-group">
    <label for="Location">Location</label>
    <br>
    <input type="text" v-model="search" class="form-control" id="Location" placeholder="Enter your location"> <!--Filtro per lcontrollare dove è il servizio -->
  </div>
  <br>
  </form>
  <div class="overflow-auto" id="servicediv">
    <ul v-show="online === false" class="services">
      <li v-for="service in filteredRealServices">
        <div class="card" :id="'servicecard' + service._id">
          <div class="card-body">
              <h5 class="card-title"><b>{{service.name}}</b></h5>
              <p class="card-text">{{service.info}}</p>
              <p class="card-text"><b>Address:</b> {{service.location}}</p>
              <p class="card-text"><b>Opened in the days:</b> {{service.openDays}}</p>
              <p class="card-text"><b>Opened from </b>{{service.openTime}} <b>to </b>{{service.closeTime}}</p>
              <p class="card-text">E-mail: {{service.mail}} - Telephone number: {{service.phone}}</p>
          </div>
        </div>
        <br>
     </li>
    </ul>
    <ul v-show="online === true" class="services">
      <li v-for="service in filteredOnlineServices">
        <div class="card" :id="'servicecard' + service._id">
          <div class="card-body">
              <h5 class="card-title"><b>{{service.name}}</b></h5>
              <p class="card-text">{{service.info}}</p>
              <p class="card-text"><b>Address:</b> {{service.location}}</p>
              <p class="card-text"><b>Opened in the days:</b> {{service.openDays}}</p>
              <p class="card-text"><b>Opened from </b>{{service.openTime}} <b>to </b>{{service.closeTime}}</p>
              <p class="card-text"><router-link to="#" class="routerlink">Go to the service</router-link></p> <!--AVVERTENZA: questo link è finto, non fa nulla -->
          </div>
        </div>
        <br>
     </li>
    </ul>
</div>
</section>
<SiteFooterVue /> <!--Il footer è uguale per tutte le pagine -->
</template>

<script>
// @ is an alias to /src
import ServiziHeaderVue from '@/components/headers/ServiziHeader.vue'
import SiteFooterVue from '@/components/SiteFooter.vue'
import axios from 'axios'

export default {
  name: 'ServiziPage',
  mounted () {
    axios.get('/api/services') /* Chiamata API per caricare i servizi mediante axios, in due array diversi per i servizi online ed offline */
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].online === false) {
            this.realservices.push(response.data[i])
          } else {
            this.onlineservices.push(response.data[i])
          }
        }
      })
  },
  components: {
    ServiziHeaderVue,
    SiteFooterVue
  },
  data () {
    return {
      realservices: [],
      onlineservices: [],
      selected: '',
      online: '',
      name: '',
      options: [ /* Qui si controllano le tipologie di servizi che si hanno a disposizione */
        { text: 'Pet Boarding', value: 'boarding' },
        { text: 'Products shop', value: 'shop' },
        { text: 'Pet Spa', value: 'spa' },
        { text: 'Pet Training Facility', value: 'training' }
      ],
      options2: [ /* Qui si controlla se un servizio è offline o meno */
        { text: 'Online', value: true },
        { text: 'Offline', value: false }
      ],
      search: ''
    }
  },
  computed: {
    filteredRealServices: function () { /* questa funzione filtra i servizi offline, controllando se... */
      const filterType = this.selected
      const searchedLoc = this.search
      const nameService = this.name
      const filterOnline = this.online
      return this.realservices.filter((service) => {
        let filtered = true
        if (filterType && filterType.length > 0) { /* ... il tipo non è vuoto... */
          if (filterOnline === false) { /* ... e se è effettivamente offline. */
            filtered = service.type === filterType
            filtered = service.online === filterOnline
          }
          filtered = service.type === filterType
        }
        if (filtered) { /* Se si ha filtrato per tipo... */
          if (searchedLoc && searchedLoc.length > 0) { /* ... si fa lo stesso per luogo... */
            filtered = service.location === searchedLoc
          }
        }
        if (filtered) {
          if (nameService && nameService.length > 0) { /* ... e per nome. */
            filtered = service.name === nameService
          }
        }
        return filtered
      })
    },
    filteredOnlineServices: function () { /* Funzione analoga a quella dei servizi "offline" */
      const filterType = this.selected
      const nameService = this.name
      const filterOnline = this.online
      return this.onlineservices.filter((service) => {
        let filtered = true
        if (filterType && filterType.length > 0) {
          if (filterOnline === true) {
            filtered = service.type === filterType
            filtered = service.online === filterOnline
          } else {
            filtered = service.type === filterType
          }
          filtered = service.type === filterType
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
.body {
  background-image: url("../assets/istockphoto-517188688-612x612.jpg");
  height: 800px;
  background-size: cover;
}
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
  .card[id^="servicecard"]{
    margin: auto;
    width: 75%;
  }
  #servicediv{
    max-height: 450px;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    border-top-style: none;
  }
  .services{
    list-style: none;
  }
#servicediv::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}

</style>>
