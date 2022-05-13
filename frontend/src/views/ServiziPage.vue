<template>
  <header class="servizi">
     <ul>
      <li><HelloWorld msg="ANIMAL HOUSE" /></li>
      <li><router-link to="/gioca">GIOCHI</router-link></li>
      <li><router-link to="/forum">FORUM</router-link></li>
      <li><router-link to="/news">NEWS</router-link></li>
      <li><router-link to="/shop">SHOP</router-link></li>
    </ul>
    <nav>
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
