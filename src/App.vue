<script>
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from './stores/auth'

export default {
  name: 'App',
  setup() {
    const { isAuthenticated } = useAuth()

    return { isAuthenticated }
  },
}
</script>

<template>
  <header class="header">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/protected-page">Protected Page</RouterLink>
  </header>

  <n-message-provider>
    <RouterView />
  </n-message-provider>
</template>

<style scoped>
/* Orange background and black text styling for the header */
.header {
  display: flex;
  justify-content: space-between; /* Align items to the left */
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ff8c00; /* Orange background color */
  color: #000; /* Black font color */
  font-size: 1.5rem;
  text-decoration: none;
}
</style>
