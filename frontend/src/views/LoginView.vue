<template>
    <div class="login">
        <form @submit.prevent="login">
            <h3>ACCEDI</h3>
            <div class="form-group">
                <label>Indirizzo e-mail</label>
                <input type="email" class="form-control form-control-lg" id="loginmail" v-model="mail"/>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" id="loginpsw" v-model="password"/>
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Accedi</button>
            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/passworddimenticata">Hai dimenticato la password ?</router-link>
            </p>
            <div class="social-icons">
                <ul>
                    <li><a href="#"><i class="fa fa-google"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      mail: '',
      password: ''
    }
  },
  methods: {
    login () {
      const self = this
      axios.post('http://localhost:8000/auth/login', { username: self.mail, password: self.password }).then((res) => {
        if (res.status === 200) {
          self.$router.push('/')
        }
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
</style>>
