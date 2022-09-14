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
import GalleryPage from '../views/GalleryPage.vue'
import AdsPage from '../views/AdsPage.vue'
import PhotoView from '../views/PhotoView.vue'
import ItemView from '../views/ItemView.vue'
import PostNewsView from '../views/PostNewsView.vue'
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
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: GalleryPage
  },
  {
    path: '/ads',
    name: 'ads',
    component: AdsPage
  },
  {
    path: '/gallery/:id',
    name: 'photo',
    component: PhotoView
  },
  {
    path: '/shop/:id',
    name: 'item',
    component: ItemView
  },
  {
    path: '/news/:id',
    name: 'newspost',
    component: PostNewsView
  }

]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
