<template>
  <html lang="en">
    <div class="vue-template">
        <form style="color:white;" aria-label="Sign in form">
            <h3>CREATE AN ACCOUNT</h3> <!--Qui è possibile compilare un form per registrarsi al sito Animal House -->
            <div class="form-group">
                <label for="name">Name (and surname)</label>
                <input id="name" type="text" class="form-control form-control-lg"/>
            </div>
            <div class="form-group">
                <label for="username">Username</label>
                <input id="username" type="text" class="form-control form-control-lg"/>
            </div>
            <div class="form-group">
                <label for="mail">E-mail address</label>
                <input id="mail" type="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label for="pass">Password</label>
                <input id="pass" type="password" class="form-control form-control-lg" />
            </div>
            <button type="button" class="btn btn-dark btn-lg btn-block" @click="register()">Sign up</button>
            <p class="forgot-password text-right">
                This account already exists
                <router-link :to="{name: 'login'}" class="routerlink">Do you want to Sign in?</router-link>
            </p>
        </form>
    </div>
    </html>
</template>
<script>
export default {
  methods: {
    register: async function () { /* Funzione che, mediante una chiamata API, permette di inserire nel database degli utenti, un nuovo utente */
      const data = {
        name: document.getElementById('name').value,
        username: document.getElementById('username').value,
        mail: document.getElementById('mail').value,
        password: document.getElementById('pass').value
      }
      fetch('/auth/register', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const data1 = {
        username: data.mail,
        password: data.password
      }
      fetch('/auth/login', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data1)
      }).then(() => {
        this.$router.back()
      })
    }
  }
}
</script>

<style lang="scss">
  .fo
  .form-group{
    position: relative;
    margin: auto;
    width: 50%;
  }
</style>>
