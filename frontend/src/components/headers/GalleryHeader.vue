<template>
  <html lang="en">
  <header>
    <img alt="Logo of Animal House" src="@/assets/logo.png" height="50">
    <b><p style="color:white;">ANIMAL HOUSE</p></b>
    <nav>
      <ul>
        <li><router-link to="/" class="routerlink">Go back to the HOMEPAGE</router-link></li>
        </ul>
    </nav>
    <nav v-show="user[0] === ''" id="loginsection">
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
    <nav v-if="user[0] !==''" id="usersection">
      <div class="card mb-3" style="background: rgb(0, 0, 190); width: 500px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="user[0].profilePicture" class="img-fluid rounded-start" alt="" style="max-height: 100px; object-fit:cover;"/>
          </div>
          <div class="col-md-8" style="background: rgb(0, 0, 190);">
            <div class="card-body">
              <h5 class="card-title" style="color:white;"><b>{{user[0].username}}</b></h5>
            </div>
              <a href="/backoffice" class="card-link" v-if="user[0].admin === true">Backoffice</a>
              <router-link to="/user" class="card-link">User Area</router-link>
              <router-link to="/cart" class="card-link">Go to the Cart</router-link>
              <a href="/auth/logout" class="card-link">Logout</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
  </html>
</template>
<script>
import axios from 'axios'
export default {
  name: 'GalleryHeader',
  mounted () {
    axios.get('/auth/isAuthenticated')
      .then((response) => {
        this.user.push(response.data)
      })
  },
  data () {
    return {
      user: []
    }
  }
}
</script>

<style lang="scss">
header {
    display: flex;
    border-bottom: 1px solid rgb(3, 3, 3);
    background-color: rgb(41, 109, 64);
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
