<template>
  <header>
    <img alt="Vue logo" src="@/assets/logo.png" height="50">
    <p>ANIMAL HOUSE</p>
    <nav>
      <ul>
        <li><router-link to="/">HOME</router-link></li>
        <li><router-link to="/gioca">GIOCHI</router-link></li>
        <li><router-link to="forum">FORUM</router-link></li>
        <li><router-link to="/news">NEWS</router-link></li>
        <li><router-link to="/shop">SHOP</router-link></li>
        </ul>
    </nav>
    <nav id="loginsection">
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
</template>

<style lang="scss">
header {
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
  #loginsection {
    margin-right: auto;
  }
</style>
