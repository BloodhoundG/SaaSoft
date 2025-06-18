/**
 * Интерфейс данных аккаунта
 */
interface IAccount {
    /** уникальный ID аккаунта в виде строки */
    id: string;

    /** Метки аккаунта в исходном виде единой строки */
    marks: string;

    /** Метки аккаунта в виде массива строк */
    marksArray: null | string[];

    /** Тип аккаунта */
    recordType: 'Локальная' | 'LDAP';

    /** Логин аккаунта */
    login: string | null;

    /** Пароль аккаунта */
    password: string | null;

    /** Метка отображения/скрытия пароля */
    isVisiblePassword: boolean;

    /** Объект содержащий булевы значения валидности отдельных полей */
    validFields: {
        /** Валидность поля меток */
        marks: boolean;

        /** Валидность поля логина */
        login: boolean;

        /** Валидность поля пароля */
        password: boolean;

        /** Валидность поля типа аккаунта */
        recordType: boolean;
    };
}
