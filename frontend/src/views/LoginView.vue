<template class="log" lang="it" >
<body class="bodymain">
    <div class="vue-template">
        <form>
            <h3>LOG IN</h3>
            <div class="form-group">
                <label>E-mail adrress</label>
                <input type="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign in</button>
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
  data () {
    return {}
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
