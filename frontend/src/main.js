import { createApp } from 'vue'
import { Vue3Mq } from 'vue3-mq'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { createStore } from 'vuex'
import product from './product'
import cart from './cart'
const store = createStore({
  modules: {
    product,
    cart
  }
})
const app = createApp(App)
app.use(router)
app.use(Vue3Mq, {
  preset: 'bootstrap5'
})
app.use(store)
app.mount('#app')
