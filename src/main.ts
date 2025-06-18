import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Подключение плагина для восстановления данных Pinia при перезагрузке страницы
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';

// Стили для иконок vuetify
import '@mdi/font/css/materialdesignicons.css';

// Стили для компонентов vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
    },
    components,
    directives,
});

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedstate)).use(vuetify).mount('#app');
