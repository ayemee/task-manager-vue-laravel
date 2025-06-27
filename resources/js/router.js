import { createRouter, createWebHistory } from 'vue-router'
import RegistrationPage from './views/RegistrationPage.vue'
import DashBoardPage from './views/DashBoardPage.vue'
import LoginPage from './views/LoginPage.vue'

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: RegistrationPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashBoardPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router