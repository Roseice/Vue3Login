// Composables
import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

const routes = [
  {
    name: 'Login',
    path: '/',
    component: Login
  },
  {
    name: 'Home',
    path: '/Home',
    component: home
  },
  // {
  //   path: "/",
  //   component: Home,
  //   children: [
  //   ]
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
