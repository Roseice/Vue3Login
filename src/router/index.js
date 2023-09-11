// Composables
import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

const routes = [
  {
    name: 'Login',
    path: '/Login',
    component: Login
  },
  {
    name: 'Home',
    path: '/',
    component: home
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // 从Cookie中获取名为'authToken'的值
  const authToken = getCookie('authToken');

  if (to.name !== 'Login' && !authToken) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

// 获取Cookie的函数
function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}

export default router
