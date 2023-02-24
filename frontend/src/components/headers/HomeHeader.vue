<template>
<html lang="en"> <!-- Di seguito ci sono tutti i link per passare da una pagina all'altra. PREMESSA: tutti gli header sono simili (con minuscole differenze), quindi solo questo presenterà i commenti. -->
<body>
  <header>
    <img alt="Logo of Animal House" src="@/assets/logo.png" height="50">
    <b><p style="color: white;">ANIMAL HOUSE</p></b>
    <nav>
      <ul>
        <li><a href="/games" class="card-link">GAMES</a></li>
        <li><router-link to="forum" class="card-link">FORUM</router-link></li>
        <li><router-link to="/news" class="card-link">NEWS</router-link></li>
        <li><router-link to="/servizi" class="card-link">SERVICES</router-link></li>
        <li><router-link to="/shop" class="card-link">SHOP</router-link></li>
        <li><router-link to="/leaderboard" class="card-link">LEADERBOARD</router-link></li>
        </ul>
    </nav>
    <nav v-show="user[0] === ''" id="loginsection"> <!-- Se l'utente non è loggato, ci sono i tasti per fare il login e registrarsi-->
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
    <nav v-if="user[0] !== ''" id="usersection" aria-label="User"> <!-- Scheda dell'utente, con scelte per mostrare link vari. Se l'utente è admin, allora ha anche accesso al backoffice e alla area di test. -->
      <div class="card mb-3" style="background: rgb(0, 0, 190); width: 500px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="user[0].profilePicture" class="img-fluid rounded-start" alt="" style="max-height: 100px; object-fit:cover;"/>
          </div>
          <div class="col-md-8" style="background: rgb(0, 0, 190);">
            <div class="card-body">
              <h5 class="card-title" style="color: white;"><b>{{user[0].username}}</b></h5>
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
</body>
</html>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HomeHeader',
  mounted () {
    axios.get('/auth/isAuthenticated') /** Questa chiamata API controlla che ci sia un utente che ha fatto accesso */
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
  #profilePicture {
    margin-right: auto;
  }
  #profilePicture{
    width: 50px ;
    height: 50px;
  }
  .card-link {
    color:#09ff00;
    &:hover{
      color:#a6ff00;
    }
  }
</style>
