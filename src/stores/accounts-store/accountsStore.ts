import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Account, AccountModel } from '@/stores/accounts-store/types.ts';
import type { RecordTypes } from '@/stores/accounts-store/types.ts';

import { formatMarks } from '@/utils/formatMarks.ts';
import { deleteSpacesFromString } from '@/utils/deleteSpacesFromString.ts';
import { isValidAccount } from '@/utils/validateFunctions.ts';

export const useAccountsStore = defineStore(
    'accounts-store',
    () => {
        /**
         * Массив аккаунтов
         */
        const accountsArray = ref<Account[]>([]);

        /**
         * Массив типов записей аккаунта
         */
        const recordTypes = ref<RecordTypes[]>([
            {
                key: 'ldap',
                name: 'LDAP',
            },
            {
                key: 'local',
                name: 'Локальная',
            },
        ]);

        /**
         * Функция добавляет новый аккаунт в массив
         */
        const addAccount = () => {
            const newAccount: Account = {
                id: crypto.randomUUID(),
                marks: [],
                login: '',
                recordType: 'local',
                password: '',
            };

            accountsArray.value.push(newAccount);
        };

        /**
         * Функция изменяет данные аккаунта
         * @param accountData - данные аккаунта
         */
        const editAccount = (accountData: AccountModel) => {
            // Форматирование строки меток в массив меток с определённой структурой
            const formattedMarks = formatMarks.parse(deleteSpacesFromString(accountData.marks));

            // Замена старых данных на новые по id переданного аккаунта из accountData
            accountsArray.value = accountsArray.value.map((account: Account) => {
                // Выполнить код если id переданного объекта совпадает с имеющимся аккаунтом
                if (account.id === accountData.id) {
                    // Если переданный объект имеет тип записи 'local'
                    if (accountData.recordType === 'local') {
                        // Вернуть объект с обновлёнными данными
                        return {
                            id: accountData.id,
                            marks: formattedMarks,
                            recordType: accountData.recordType,
                            login: accountData.login,
                            password: accountData.password,
                        };
                    }

                    // Если переданный объект имеет тип записи 'ldap'
                    if (accountData.recordType === 'ldap') {
                        // Установить password в null и вернуть объект с обновлёнными данными
                        return {
                            id: accountData.id,
                            marks: formattedMarks,
                            recordType: accountData.recordType,
                            login: accountData.login,
                            password: null,
                        };
                    }
                }

                // Вернуть исходный объект
                return account;
            });
        };

        /**
         * Функция удаляет аккаунт
         * @param accountId - id аккаунта
         */
        const deleteAccount = (accountId: string) => {
            // Удаление аккаунта
            accountsArray.value = accountsArray.value.filter((account) => account.id !== accountId);
        };

        return { accountsArray, recordTypes, addAccount, editAccount, deleteAccount };
    },
    {
        // При перезагрузке страницы / закрытии окна сохраняем данные
        persist: {
            // После восстановления данных
            afterHydrate: (ctx) => {
                // Удаляются аккаунты с невалидными данными
                ctx.store.accountsArray = ctx.store.accountsArray.filter((account: Account) => {
                    return isValidAccount(account);
                });
            },
        },
    }
);
