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
        <p class="card-text">Name: {{user[0].name}} <br>
        Username: {{user[0].username}} <br>
        Mail address: {{user[0].mail}} <br>
        List of pets: {{user[0].ownedAnimals}}</p>
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
    axios.get('http://localhost:8000/auth/isAuthenticated')
      .then((response) => {
        this.user.push(response.data)
        console.log(this.user.length)
      })
  },
  components: { SiteFooterVue },
  data () {
    return {
      user: []
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
