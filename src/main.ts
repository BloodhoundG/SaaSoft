import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './assets/base.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import App from './App.vue';
import router from './router';
import ToastPlugin from 'vue-toast-notification';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(ToastPlugin);
app.use(pinia);
app.use(router);

app.mount('#app');
