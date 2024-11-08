// src/stores/auth.js
import { ref } from 'vue'

export const useAuth = () => {
  // Check localStorage for stored authentication status on app load
  const storedAuthStatus = localStorage.getItem('isAuthenticated')
  const isAuthenticated = ref(storedAuthStatus === 'true') // Convert stored string to boolean

  // Function to log in (set authenticated state to true)
  const login = () => {
    isAuthenticated.value = true
    // Persist the authentication state in localStorage
    localStorage.setItem('isAuthenticated', 'true')
  }

  // Function to log out (set authenticated state to false)
  const logout = () => {
    isAuthenticated.value = false
    // Remove authentication state from localStorage
    localStorage.removeItem('isAuthenticated')
  }

  return { isAuthenticated, login, logout }
}
