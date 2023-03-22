import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import UpdatePassword from '../views/UpdatePassword.vue'
import UseAuthUsers from '../composables/UseAuthUsers'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/update',
    name: 'Update',
    component: UpdatePassword
  },
  {
    path: '/',
    name: '',
    component: () => import('../views/Dashboard/DashboardPage.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard/MyFinancesPage.vue')
      },
      {
        path: '/configuracoes',
        name: 'Config',
        component: () => import('../views/Dashboard/ConfigPage.vue')
      }
    ],
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const { isLoggedIn } = UseAuthUsers()
  if (to.hash.includes('type=recovery') && to.name !== 'Update') {
    const accessToken = to.hash.split('&')[0]
    const token = accessToken.replace('#access_token=', '')

    return { name: 'Update', query: { token } }
  }
  if (!isLoggedIn() && to.meta.requiresAuth) {
    return { name: 'Login' }
  }
})

export default router
