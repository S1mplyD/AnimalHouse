<template>
    <div class="vue-template">
        <form>
            <h3>CREA UN ACCOUNT</h3>
            <div class="form-group">
                <label>Nome e cognome</label>
                <input type="text" class="form-control form-control-lg"/>
            </div>
            <div class="form-group">
                <label>Indirizzo e-mail</label>
                <input type="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Registrati</button>
            <p class="forgot-password text-right">
                Questo account esiste già
                <router-link :to="{name: 'login'}" class="routerlink">Accedi?</router-link>
            </p>
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
  .fo
  .form-group{
    position: relative;
    margin: auto;
    width: 50%;
  }
</style>>
