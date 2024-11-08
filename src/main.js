import './assets/main.css'

import { createApp } from 'vue'
import {
  create,
  NButton,
  NSpace,
  NInputGroup,
  NInput,
  NSelect,
  NDivider,
  NTable,
  NSpin,
  NInputNumber,
  NMessageProvider,
} from 'naive-ui'

import App from './App.vue'
import router from './router'

const naive = create({
  components: [
    NButton,
    NSpace,
    NInputGroup,
    NInput,
    NSelect,
    NDivider,
    NTable,
    NSpin,
    NInputNumber,
    NMessageProvider,
  ],
})

const app = createApp(App)
app.use(naive)
app.use(router)
app.mount('#app')
