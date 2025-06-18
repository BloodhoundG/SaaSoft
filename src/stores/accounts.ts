import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAccountsStore = defineStore(
    'accounts-store',
    () => {
        const accounts = ref<IAccount[]>([]);

        return { accounts };
    },
    {
        persist: {
            pick: ['accounts'],
            afterHydrate: (ctx) => {
                // При перезагрузке страницы отработает плагин Pinia и сохранит данные в localStore
                // После перезагрузки плагин восстановит эти данные в Pinia, удалив аккаунты с невалидными данными
                ctx.store.accounts = ctx.store.accounts.filter((i: IAccount) => {
                    const isEveryFieldValid = Object.values(i.validFields).every((i) => i);

                    if (isEveryFieldValid) {
                        return i;
                    }
                });
            },
        },
    }
);
