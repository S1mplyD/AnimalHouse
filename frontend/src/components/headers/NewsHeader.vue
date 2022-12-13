<template lang="en">
  <header>
    <img alt="Logo of Animal House" src="@/assets/logo.png" height="50">
    <b><p>ANIMAL HOUSE</p></b>
    <nav>
      <ul>
        <li><router-link to="/" class="routerlink">HOMEPAGE</router-link></li>
        <li><a href="/games" class="routerlink">GAMES</a></li>
        <li><router-link to="forum" class="routerlink">FORUM</router-link></li>
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
      <div class="card mb-3" style="background: rgb(60, 121, 150); width: 500px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="user[0].profilePicture" class="img-fluid rounded-start" alt="" style="max-height: 100px; object-fit:cover;"/>
          </div>
          <div class="col-md-8" style="background: rgb(60, 121, 150);">
            <div class="card-body">
              <h5 class="card-title"><b>{{user[0].username}}</b></h5>
            </div>
              <a href="/test" class="card-link" v-if="user[0].admin === true">Testarea</a>
              <a href="/backoffice" class="card-link" v-if="user[0].admin === true">Backoffice</a>
              <router-link to="/user" class="card-link">User Area</router-link>
              <router-link to="/cart" class="card-link">Go to the Cart</router-link>
              <a href="/auth/logout" class="card-link">Logout</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
import axios from 'axios'

export default {
  name: 'NewsHeader',
  mounted () {
    axios.get('/auth/isAuthenticated')
      .then((response) => {
        this.user.push(response.data)
        console.log(this.user.length)
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
