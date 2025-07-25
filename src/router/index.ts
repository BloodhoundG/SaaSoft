import { createRouter, createWebHistory } from 'vue-router';

import PageAccountManager from '@/views/page-account-manager/PageAccountManager.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: PageAccountManager,
        },
    ],
});

export default router;
