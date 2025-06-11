import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import registerGlobalComponents from './plugins/registerGlobalComponents'
import ErrorHandlerPlugin from './plugins/errorHandler'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ErrorHandlerPlugin)

registerGlobalComponents(app)

app.mount('#app')
