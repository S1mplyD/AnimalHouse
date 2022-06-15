<template lang="it">
  <body class="bodymain">
    <div class="vue-template">
        <form>
            <h3>CREATE AN ACCOUNT</h3>
            <div class="form-group">
                <label>Name and surname</label>
                <input type="text" class="form-control form-control-lg"/>
            </div>
            <div class="form-group">
                <label>E-mail address</label>
                <input type="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign up</button>
            <p class="forgot-password text-right">
                This account already exists
                <router-link :to="{name: 'login'}" class="routerlink">Do you want to Sign in?</router-link>
            </p>
        </form>
    </div>
  </body>
</template>
<script>
export default {
  data () {
    return {}
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
