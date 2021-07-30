import { createApp } from 'vue'
import App from './App.vue'
import element from './src/utils/element'

createApp(App)
  .use(element)
  .mount('#app')
