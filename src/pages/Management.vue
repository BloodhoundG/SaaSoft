<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts.ts';
import { storeToRefs } from 'pinia';

const accountsStore = useAccountsStore();

const { accounts } = storeToRefs(accountsStore);

// Правила валидации для полей ввода
const rules = {
    required: (value: string) => !!value || 'Обязательное поле',
    min8: (value: string) => value.length >= 8 || 'Минимум 8 символов',
    max50: (value: string) => value.length <= 50 || 'Максимум 50 символов',
    max100: (value: string) => value.length <= 100 || 'Максимум 100 символов',
};

// Массив доступных типов записи
const allRecordTypes = ['Локальная', 'LDAP'];

// Функция добавляет аккаунт
const onClickAddAccount = () => {
    // Генерируется уникальная ID строка для аккаунта
    const id = crypto.randomUUID();

    // Создаётся объект данных нового аккаунта
    const object: IAccount = {
        id: id,
        marks: '',
        marksArray: null,
        recordType: 'Локальная',
        login: null,
        password: null,
        isVisiblePassword: false,
        validFields: {
            marks: true,
            recordType: true,
            login: false,
            password: false,
        },
    };

    // Объект добавляется в Pinia
    accounts.value.push(object);
};

// Функция удаляет аккаунт по уникальному ID
const onClickDeleteAccount = (accountId: string) => {
    accounts.value = accounts.value.filter((i) => i.id !== accountId);
};

// Функция валидирует значение выбранного поля при потере фокуса мыши
// В функцию передаётся целевой объект аккаунта для изменения, и тип поля key
const onMouseLeaveValidateField = (account: IAccount, key: string) => {
    if (key === 'marks') {
        // Достается текущее значение поля
        const value = account[key];

        // Проверяется валидность с помощью правил
        const isValid = rules.max50(value || '') === true;

        // Если поле не валидно
        if (!isValid) {
            // Установить свойства текущего объекта валидации в false
            account.validFields[key] = false;
            return;
        }

        account.validFields[key] = true;

        // Значения поля метки разделить символом ';', отфильтровать пустые
        // затем записать в свойство для хранения массива строк марок
        account.marksArray = value.split(';').filter((i) => i);
    }

    if (key === 'login') {
        const value = account[key];

        const isValid = rules.required(value || '') === true && rules.max100(value || '') === true;

        if (!isValid) {
            account.validFields[key] = false;
            return;
        }

        account.validFields[key] = true;
    }

    if (key === 'password') {
        const value = account[key];

        const isValid = rules.required(value || '') === true && rules.min8(value || '') === true;

        if (!isValid) {
            account.validFields[key] = false;
            return;
        }

        account.validFields[key] = true;
    }
};

// Функция валидирует значение выбранного поля при изменении значения поля
// В функцию передаётся целевой объект аккаунта для изменения, и тип поля key
const onUpdateValidateField = (account: IAccount, key: string) => {
    if (key === 'recordType') {
        const value = account[key];

        // Если тип записи стал LDAP
        if (value === 'LDAP') {
            // Присвоить данному свойству пароля аккаунта null
            account.password = null;

            // Разрешить валидацию данного поля
            account.validFields.password = true;
        } else {
            // Если тип записи отличается от 'LDAP' установить свойство валидации в false
            account.validFields.password = false;
        }

        // Если каким-то образом значение типа записи будет не из массива с доступными типами
        if (!allRecordTypes.includes(value)) {
            // Установить значение свойства валидации в false
            account.validFields[key] = false;
            return;
        }

        account.validFields[key] = true;
    }
};
</script>

<template>
    <div class="form">
        <div class="form__header-wrapper">
            <h1 class="form__header">Учётные записи</h1>
            <div class="form__add-account" @click="onClickAddAccount"></div>
        </div>

        <div class="form__notice-wrapper">
            <p class="form__notice">
                Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;. Например:
                "ab;cd;ef".
            </p>
        </div>

        <div class="form__account-list">
            <div class="form__account-item" v-for="account in accounts" :key="account.id">
                <v-text-field
                    v-model="account.marks"
                    label="Метки"
                    name="marks"
                    :rules="[rules.max50]"
                    variant="outlined"
                    @mouseleave="onMouseLeaveValidateField(account, 'marks')"
                ></v-text-field>

                <v-select
                    v-model="account.recordType"
                    label="Тип записи"
                    name="recordType"
                    :items="allRecordTypes"
                    :rules="[rules.required]"
                    variant="outlined"
                    @update:modelValue="onUpdateValidateField(account, 'recordType')"
                ></v-select>

                <v-text-field
                    v-model="account.login"
                    label="Логин"
                    name="login"
                    :rules="[rules.required, rules.max100]"
                    variant="outlined"
                    @mouseleave="onMouseLeaveValidateField(account, 'login')"
                ></v-text-field>

                <v-text-field
                    v-if="account.recordType !== 'LDAP'"
                    v-model="account.password"
                    :rules="[rules.required, rules.min8]"
                    :type="account.isVisiblePassword ? 'text' : 'password'"
                    label="Пароль"
                    name="password"
                    variant="outlined"
                    @mouseleave="onMouseLeaveValidateField(account, 'password')"
                >
                    <template #append-inner>
                        <v-icon
                            :icon="account.isVisiblePassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click="account.isVisiblePassword = !account.isVisiblePassword"
                        />
                    </template>
                </v-text-field>

                <div v-else></div>

                <div class="form__delete-button">
                    <v-icon icon="mdi-account-off-outline" @click="onClickDeleteAccount(account.id)" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.form {
    &__header-wrapper {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    &__add-account {
        position: relative;
        width: 50px;
        height: 50px;
        background: #ebebeb;
        border-radius: 50%;
        border: 1px solid #000;
        cursor: pointer;

        &::before,
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
            background: #000;
        }

        &::before {
            width: 20px;
            height: 2px;
        }

        &::after {
            width: 2px;
            height: 20px;
        }
    }

    &__notice-wrapper {
        padding: 20px 0 0;
    }

    &__notice {
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 20px 10px;
        border-radius: 10px;
        background: #ebebeb;

        &::before {
            content: '?';
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #00d1ff;
        }
    }

    &__account-list {
        padding: 30px 0 0;
    }

    &__account-item {
        display: grid;
        gap: 10px;
        padding: 0 0 10px;
        grid-template-columns: repeat(4, 1fr) 80px;
    }

    &__delete-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 56px;
        background: #ff2e2e;
        border-radius: 50%;
        border: 1px solid #000;

        .v-icon {
            font-size: 35px;
        }
    }
}
</style>
