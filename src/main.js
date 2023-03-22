import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './css/tailwind.css'
import Toast, { POSITION } from 'vue-toastification'
import money from 'v-money3'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(Toast, { position: POSITION.BOTTOM_RIGHT })
app.use(money)
app.mount('#app')
