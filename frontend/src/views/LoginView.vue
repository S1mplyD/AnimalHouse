<template class="log" lang="en" >
<body class="bodymain">
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
    login: async function () {
      const data = {
        username: document.getElementById('mail').value,
        password: document.getElementById('pass').value
      }
      fetch('http://localhost:8000/auth/login', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((res) => {
        console.log(res)
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
