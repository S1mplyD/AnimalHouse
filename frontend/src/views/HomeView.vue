<template>
  <header class="home">
     <ul>
      <li><HelloWorld msg="ANIMAL HOUSE" /></li>
      <li><router-link to="/gioca">GIOCHI</router-link></li>
      <li><router-link to="forum">FORUM</router-link></li>
      <li><router-link to="/news">NEWS</router-link></li>
      <li><router-link to="/servizi">SERVIZI</router-link></li>
      <li><router-link to="/shop">SHOP</router-link></li>
    </ul>
    <nav class="loginsection">
      <ul>
      <li>
    <router-link to="/login">
        <button type="submit" class="btn btn-dark btn-lg btn-block">LOGIN</button>
    </router-link></li>
      <li>
          <router-link to="/registrarsi">
              <button type="submit" class="btn btn-dark btn-lg btn-block">CREA UN ACCOUNT</button>
            </router-link>
        </li>
      </ul>
    </nav>
  </header>
  <section class="body">
    <nav class="Images">
    <ul>
      <li>
         <p>Vuoi vedere altre immagini? <router-link :to="{name: 'gallery'}">Entra nella Galleria!</router-link></p>
      </li>
    </ul>
    </nav>
    <nav class="TopPosts">
    <ul>
      <li>
         <p>Vuoi vedere altre news e post dal forum? <router-link :to="{name: 'forum'}">Entra nel Forum della comunità!</router-link></p>
      </li>
    </ul>
    </nav>
    <nav class="ADS">
    <ul>
      <li>
        <router-link :to="{name: 'ads'}">
          <div class="Adsblock">
            <p>!!!ADS!!!</p>
          </div>
        </router-link>
      </li>
    </ul>
    </nav>
  </section>
  <footer class="cr">
    <p>Copyright &copy; {{ year }}</p>
  </footer>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { computed } from 'vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  setup () {
    const year = computed(() => new Date().getFullYear())
    return { year }
  }
}
</script>

<style lang="scss">
  .home {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding: .5rem 1rem;

    p {
      margin-left: 1rem;
    }
  }

  .loginsection {
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
    padding: 20px;
    border: 1px solid #333;
  }
  .body{
    height: 800px;
    border: 1px solid #333;
  }
  .Images {
  float: left;
  text-align: center;
  width: 30%;
  height:100%;
  background: #ccc;
  padding: 20px;
}
.TopPosts {
  float: right;
  text-align: center;
  width: 30%;
  height:100%;
  background: #ccc;
  padding: 20px;
}
.ADS {
  margin: auto;
  text-align: center;
  width: 40%;
  height:100%;
  background: rgb(255, 255, 255);
  padding: 20px;

}
.Adsblock{
  float:center;
  text-align: center;
  width: 500px;
  height:500px;
  background: rgb(175, 22, 22);
  padding: 20px;
}
</style>
