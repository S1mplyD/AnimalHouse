import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistroView from '../views/RegistroView.vue'
import ForumPage from '../views/ForumPage.vue'
import ShopPage from '../views/ShopPage.vue'
import ServiziPage from '../views/ServiziPage.vue'
import NewsPage from '../views/NewsPage.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import GalleryPage from '../views/GalleryPage.vue'
import LeaderboardPage from '../views/LeaderboardPage.vue'
import NewsPost from '../components/news/NewsPost.vue'
import UserPage from '../views/UserPage.vue'
import CartList from '../components/shop/CartList.vue'
import PostComponent from '../components/forum/PostComponent.vue'
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
    path: '/forum/:id',
    name: 'post',
    component: PostComponent
  },
  {
    path: '/user',
    name: 'user',
    component: UserPage
  },
  {
    path: '/shop',
    name: 'shop',
    component: ShopPage
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartList
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
    path: '/leaderboard',
    name: 'leaderboard',
    component: LeaderboardPage
  },
  {
    path: '/news/:id',
    name: 'newspost',
    component: NewsPost
  }

]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
