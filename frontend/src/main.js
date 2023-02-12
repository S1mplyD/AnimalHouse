import { createApp } from 'vue'
import { Vue3Mq } from 'vue3-mq'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
const i18n = createI18n({
  locale: 'en'
})
/* Qui viene effettivamente creata la App che tiene in piedi il sito di Animal House */
const app = createApp(App)
app.use(i18n)
app.use(router)
app.use(Vue3Mq, {
  preset: 'bootstrap5'
})
app.mount('#app')
