import { createApp } from 'vue'
import App from './App.vue'

import { IonicVue } from '@ionic/vue'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'
import './index.css'

/* Dark mode */
import '@ionic/vue/css/palettes/dark.system.css'

/* Theme variables */
import './theme/variables.css'

import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomePage from './views/HomePage.vue'

const routes = [{ path: '/', component: HomePage }]
import { StatusBar } from "@capacitor/status-bar";

StatusBar.setOverlaysWebView({ overlay: false }); // Pushes app below status bar
StatusBar.show(); // Make sure it's visible


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const app = createApp(App)

app.use(IonicVue) // ✅ for older Ionic Vue
app.use(router)

router.isReady().then(() => {
  app.mount('#app');
  StatusBar.setOverlaysWebView({ overlay: false });
});
