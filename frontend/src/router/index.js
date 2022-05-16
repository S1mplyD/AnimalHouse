import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistroView from '../views/RegistroView.vue'
import ForumPage from '../views/ForumPage.vue'
import GamePage from '../views/GamePage.vue'
import ShopPage from '../views/ShopPage.vue'
import ServiziPage from '../views/ServiziPage.vue'
import NewsPage from '../views/NewsPage.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/registrarsi',
    name: 'registrarsi',
    component: RegistroView
  },
  {
    path: '/forum',
    name: 'forum',
    component: ForumPage
  },
  {
    path: '/gioca',
    name: 'gioca',
    component: GamePage
  },
  {
    path: '/shop',
    name: 'shop',
    component: ShopPage
  },
  {
    path: '/news',
    name: 'news',
    component: NewsPage
  },
  {
    path: '/servizi',
    name: 'servizi',
    component: ServiziPage
  },
  {
    path: '/passworddimenticata',
    name: 'passworddimenticata',
    component: ForgotPassword
  }

]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router