<template class="log" lang="en" >
<body class="bodymain"> <!--Qui è possibile accedere al proprio account, mediante un semplice form-->
    <div class="vue-template">
        <form>
            <h3>LOG IN</h3>
            <div class="form-group">
                <label for="mail">E-mail adrress</label>
                <input type="email" class="form-control form-control-lg" id="mail"/>
            </div>
            <div class="form-group">
                <label for="pass">Password</label>
                <input type="password" class="form-control form-control-lg" id="pass"/>
            </div>
            <button type="button" class="btn btn-dark btn-lg btn-block" @click="login()">Sign in</button>
            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/passworddimenticata" class="routerlink">Did you forget your password?</router-link>
            </p>
            <div class="social-icons">
                <ul>
                    <li style= "padding-right:2em"><a href="#"><i class="fa fa-google"></i></a></li>
                    <li style= "padding-right:2em"><a href="#"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div>
        </form>
    </div>
  </body>
</template>
<script>
export default {
  methods: {
    login: async function () { /* Funzione che fa una chiamata API in fetch per permettere di ottenere i dati e fare l'accesso  */
      const data = {
        username: document.getElementById('mail').value,
        password: document.getElementById('pass').value
      }
      fetch('/auth/login', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((res) => {
        this.$router.back()
      })
    }
  }
}
</script>
<style lang="scss">
  .form-group{
    position: relative;
    margin: auto;
    width: 50%;
  }
.social-icons{
  ul {
    display: inline-flex;
    list-style-type: none;
  }
}
</style>>
