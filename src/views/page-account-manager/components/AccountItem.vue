<script setup lang="ts">
import type { Account, AccountModel } from '@/stores/accounts-store/types.ts';
import type { IValidateProps } from '@/views/page-account-manager/components/types.ts';

import InputText from '@/components/ui/inputs/InputText.vue';
import InputPassword from '@/components/ui/inputs/InputPassword.vue';
import SelectType from '@/components/ui/selects/SelectType.vue';
import ButtonDelete from '@/components/ui/buttons/ButtonDelete.vue';

import { ref, watch } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useAccountsStore } from '@/stores/accounts-store/accountsStore.ts';
import { isValidMarksField } from '@/utils/validateFunctions.ts';
import { isValidLoginField } from '@/utils/validateFunctions.ts';
import { isValidPasswordField } from '@/utils/validateFunctions.ts';

import { formatMarks } from '@/utils/formatMarks.ts';

const props = defineProps<{
    account: Account;
}>();

const accountStore = useAccountsStore();
const { editAccount, deleteAccount } = accountStore;

const $toast = useToast();

// Создание модели аккаунта
const accountModel = ref<AccountModel>({
    ...props.account,
    marks: formatMarks.stringify(props.account.marks),
});

// Наблюдатель для обновления изменений полей "тип записи"
watch(
    () => accountModel.value.recordType,
    (recordType) => {
        if (recordType === 'ldap') {
            accountModel.value.password = null;
        }

        accountModel.value.password = '';
        editAccount(accountModel.value);
        $toast.success('Данные обновлены.');
    }
);

// Объект пропсов валидации полей аккаунта
const validateProps = ref<IValidateProps>({
    marks: {
        value: true,
        validator: isValidMarksField,
    },
    login: {
        value: true,
        validator: isValidLoginField,
    },
    password: {
        value: true,
        validator: isValidPasswordField,
    },
});

// Функция-обработчик события blur
const onBlur = (key: keyof IValidateProps) => {
    // Значение модели
    const modelValue = accountModel.value[key];

    // Изменяется значение пропса валидации
    validateProps.value[key].value = validateProps.value[key].validator(modelValue || '');

    // Обновление данных
    editAccount(accountModel.value);

    // Если результатом значения пропса стал !true
    if (validateProps.value[key].value !== true) {
        // Показать пользователю предупреждение
        $toast.warning('Аккаунт с невалидными данными не будет сохранён.');
    } else {
        // В противном случае показать оповещение об успешном выполнении обновления данных
        $toast.success('Данные обновлены.');
    }
};

// Функция-обработчик удаления аккаунта
const onClickDeleteAccount = (accountId: string) => {
    // Удаление аккаунта
    deleteAccount(accountId);

    // Вывод оповещения
    const $toast = useToast();
    $toast.success('Аккаунт успешно удалён.');
};
</script>

<template>
    <InputText v-model="accountModel.marks" :isValid="validateProps.marks.value" name="marks" @blur="onBlur('marks')" />
    <SelectType v-model="accountModel.recordType" />
    <InputText v-model="accountModel.login" :isValid="validateProps.login.value" name="login" @blur="onBlur('login')" />
    <InputPassword
        v-if="accountModel.recordType === 'local'"
        v-model="accountModel.password"
        :isValid="validateProps.password.value"
        name="password"
        @blur="onBlur('password')"
    />
    <ButtonDelete @click="onClickDeleteAccount(accountModel.id)" />
</template>

<style scoped lang="scss"></style>
