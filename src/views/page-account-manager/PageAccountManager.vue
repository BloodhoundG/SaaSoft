<script setup lang="ts">
import ButtonAdd from '@/components/ui/buttons/ButtonAdd.vue';
import IconQuestionMark from '@/components/icons/IconQuestionMark.vue';
import AccountItem from '@/views/page-account-manager/components/AccountItem.vue';

import { useToast } from 'vue-toast-notification';
import { useAccountsStore } from '@/stores/accounts-store/accountsStore.ts';
import { storeToRefs } from 'pinia';

const accountsStore = useAccountsStore();

const { addAccount } = useAccountsStore();

const { accountsArray } = storeToRefs(accountsStore);

// Функция-обработчик функции добавления аккаунта
const onClickAddAccount = () => {
    addAccount();

    const $toast = useToast();

    $toast.success('Аккаунт успешно создан.');
};
</script>

<template>
    <main class="max-w-5xl mx-auto">
        <h2 class="flex pt-5 pb-5 gap-5 items-center text-3xl">
            Учётные записи
            <ButtonAdd @click="onClickAddAccount" />
        </h2>

        <p class="flex items-center gap-3 p-4 bg-cyan-300 rounded-2xl">
            <IconQuestionMark />
            Для указания нескольких меток для одной пары используйте разделитель ;
        </p>

        <div>
            <div class="grid gap-4 grid-cols-4 pb-4 pt-4 font-bold">
                <div>Метки</div>
                <div>Тип записи</div>
                <div>Логин</div>
                <div>Пароль</div>
            </div>

            <div class="grid gap-2">
                <div
                    class="grid items-start gap-4 grid-cols-[repeat(4,1fr)_50px]"
                    v-for="account in accountsArray"
                    :key="account.id"
                >
                    <AccountItem :account="account" />
                </div>
            </div>
        </div>
    </main>
</template>
