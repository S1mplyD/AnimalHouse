<template lang="en">
  <header>
    <img alt="Logo of Animal House" src="@/assets/logo.png" height="50">
    <b><p>ANIMAL HOUSE</p></b>
    <nav>
      <ul>
        <li><router-link to="/" class="routerlink">HOMEPAGE</router-link></li>
        <li><router-link to="/gioca" class="routerlink">GAMES</router-link></li>
        <li><router-link to="/news" class="routerlink">NEWS</router-link></li>
        <li><router-link to="/servizi" class="routerlink">SERVICES</router-link></li>
        <li><router-link to="/shop" class="routerlink">SHOP</router-link></li>
        </ul>
    </nav>
    <nav v-show="user.length < 1" id="loginsection">
      <ul>
      <li>
    <router-link to="/login">
        <button type="submit" class="btn btn-dark btn-lg btn-block">LOG IN</button>
    </router-link></li>
      <li>
          <router-link to="/registrarsi">
              <button type="submit" class="btn btn-dark btn-lg btn-block">CREATE AN ACCOUNT</button>
            </router-link>
        </li>
      </ul>
    </nav>
    <nav v-if="user.length === 1" id="usersection">
      <p><b>{{user[0].username}}</b></p>
      <div v-if="user[0].admin === true"><router-link to="/backoffice/" class="routerlink">Go to the Backoffice</router-link></div>
      <router-link to="/user" class="routerlink">Go to the User Area</router-link>
    </nav>
  </header>
</template>
<script>
import axios from 'axios'

export default {
  name: 'ForumHeader',
  mounted () {
    axios.get('http://localhost:8000/auth/isAuthenticated')
      .then((response) => {
        this.user.push(response.data)
      })
  },
  data () {
    return {
      user: []
    }
  },
  computed: {

  }
}
</script>

<style lang="scss">
header {
    display: flex;
    border-bottom: 1px solid rgb(3, 3, 3);
    background-color: rgb(0, 68, 40);
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
</style>
