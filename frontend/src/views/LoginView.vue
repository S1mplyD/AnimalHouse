<template>
    <div class="login">
        <form>
            <h3>ACCEDI</h3>
            <div class="form-group">
                <label>Indirizzo e-mail</label>
                <input type="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Accedi</button>
            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/passworddimenticata">Hai dimenticato la password ?</router-link>
            </p>
            <div class="social-icons">
                <ul>
                    <li style= "padding-right:2em"><a href="#"><i class="fa fa-google"></i></a></li>
                    <li style= "padding-right:2em"><a href="#"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div>
        </form>
    </div>
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
