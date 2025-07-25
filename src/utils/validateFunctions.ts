import { validateRules } from '@/utils/validateRules.ts';
import { formatMarks } from '@/utils/formatMarks.ts';
import type { Account } from '@/stores/accounts-store/types.ts';

/**
 * Функция принимает строковое значения модели марок и валидирует его
 * @param modelValue
 */
export const isValidMarksField = (modelValue: string) => {
    // Валидация на максимальную длину значения модели
    return validateRules.maxLength(modelValue, 50);
};

/**
 * Функция принимает строковое значение модели логина и валидирует его
 * @param modelValue
 */
export const isValidLoginField = (modelValue: string) => {
    // Валидация на обязательность поля
    const required = validateRules.required(modelValue);
    if (required !== true) return required;

    // Валидация на максимальную длину значения модели
    const maxLength = validateRules.maxLength(modelValue, 100);
    if (maxLength !== true) return maxLength;

    return true;
};

/**
 * Функция принимает строковое значение модели пароля и валидирует его
 * @param modelValue
 */
export const isValidPasswordField = (modelValue: string) => {
    // Валидация на обязательность поля
    const required = validateRules.required(modelValue);
    if (required !== true) return required;

    // Валидация на максимальную длину значения модели
    const maxLength = validateRules.maxLength(modelValue, 100);
    if (maxLength !== true) return maxLength;

    return true;
};

/**
 * Функция валидирует данные аккаунта и возвращает true/false
 * @param accountData - данные аккаунта
 */
export const isValidAccount = (accountData: Account) => {
    const marks = formatMarks.stringify(accountData.marks);
    const login = accountData.login;
    const password = accountData.password;
    const type = accountData.recordType;

    const isValidMarks = isValidMarksField(marks);
    const isValidLogin = isValidLoginField(login);
    let isValidPassword;

    if (type === 'local' && password) {
        isValidPassword = isValidPasswordField(password);
    } else {
        isValidPassword = false;
    }

    if (type === 'ldap') {
        isValidPassword = true;
    }

    const isValidAccount = [isValidMarks, isValidLogin, isValidPassword].every((i) => {
        return i === true;
    });

    return isValidAccount;
};
