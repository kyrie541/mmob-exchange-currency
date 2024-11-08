import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../stores/auth'

import HomePage from '../views/HomePage.vue'
import ProtectedPage from '../views/ProtectedPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/protected-page',
      name: 'protected-page',
      component: ProtectedPage,
      meta: { requiresAuth: true }, // This route requires authentication
    },
  ],
})

// Global route guard to protect private routes
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth()
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    // If the route requires auth and the user isn't authenticated, redirect to login
    next({ name: 'home' })
  } else {
    next() // Allow navigation
  }
})

export default router
