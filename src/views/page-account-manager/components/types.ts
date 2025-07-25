/**
 * Объект пропсов валидации для всех типов полей аккаунта
 */
export interface IValidateProps {
    marks: {
        // Булево значение или строка с текстом ошибки
        value: boolean | string;

        // Функция валидации
        validator: (modelValue: string) => boolean | string;
    };
    password: {
        value: boolean | string;
        validator: (modelValue: string) => boolean | string;
    };
    login: {
        value: boolean | string;
        validator: (modelValue: string) => boolean | string;
    };
}
