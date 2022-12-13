<template lang="en">
  <header>
    <div id="titlepart">
      <h1 class="title">Welcome to your personal User Area, <br> {{user[0].name}}!</h1>
      <button @click="this.$router.back()" class="btn btn-dark btn-lg btn-block" id="goBack">Go Back</button>
    </div>
  </header>
  <section class="mainUser">
    <div class="card" id="usercard">
      <div class="card-body">
        <h2 class="card-title">Personal Data:</h2>
        <p class="card-text" id="userinfo">
          <b>Name:</b> {{user[0].name}} <br>
          <b>Username:</b> {{user[0].username}} <br>
          <b>Mail address:</b> {{user[0].mail}} <br>
          <b>List of pets:</b> {{pets}}
        </p>
        <label for="petname">Name of the pet to add</label>
        <input id="petname" type="text" class="form-control form-control-lg" />
        <button type="button" class="btn btn-dark btn-lg btn-block" id="addpets" @click="addPets()">Add a new pet</button>
        <br>
        <label for="petname2">Name of the pet to remove</label>
        <input id="petname2" type="text" class="form-control form-control-lg" />
        <button type="button" class="btn btn-dark btn-lg btn-block" id="addpets" @click="removePets()">Remove the pet</button>
      </div>
    </div>
  </section>
  <SiteFooterVue/>
</template>

<script>
import axios from 'axios'
import SiteFooterVue from '@/components/SiteFooter.vue'

export default {
  name: 'UserPage',
  mounted () {
    axios.get('/auth/isAuthenticated')
      .then((response) => {
        this.user.push(response.data)
        console.log(this.user.length)
      })
    axios.get('/api/users/userPets')
      .then((response) => {
        this.pets.push(response.data)
        console.log(this.pets.length)
      })
  },
  components: { SiteFooterVue },
  data () {
    return {
      user: [],
      pets: []
    }
  },
  methods: {
    addPets: async function () {
      const pet = {
        name: document.getElementById('petname').value
      }
      console.log(document.getElementById('petname').value)
      fetch('/api/pets', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(pet)
      })
    },
    removePets: async function () {
      console.log(document.getElementById('petname').value)
      fetch('/api/pets?pet=' + document.getElementById('petname2').value, {
        method: 'delete',
        headers: {
          'Content-type': 'application/json'
        }
      })
    }
  }
}
</script>

<style lang="scss">
header{
  width: 100%;
  border-bottom: 1px solid rgb(3, 3, 3);
  background-color: rgb(0, 68, 40);
  padding: .5rem 1rem;
}
#titlepart {
  text-align: center;
}
.mainUser {
  text-align: left;
  background-color: rgb(60, 121, 150);
  height: 800px;
  border: 1px solid #333;
}
#usercard {
  background-color: aquamarine;
}
#goBack {
  margin-right: auto;
}
</style>
