<template>
  <div>Home page</div>
  <n-button id="login-button" @click="handleLogin">Login</n-button>
</template>
<script>
import { useAuth } from '../stores/auth'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const { login } = useAuth()
    const router = useRouter()

    const handleLogin = () => {
      login() // Mark the user as logged in
      router.push('/protected-page')
    }

    return { handleLogin }
  },
}
</script>
