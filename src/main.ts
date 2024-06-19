import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './assets/index.css'
import App from './App.vue'
import i18n from './i18n';
import router from './router';

const app = createApp(App)
const pinia = createPinia()

app.use(i18n)
app.use(router)
app.use(pinia)

app.mount('#app')