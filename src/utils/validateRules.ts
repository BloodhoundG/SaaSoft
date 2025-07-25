/**
 * Объект валидации
 */
export const validateRules = {
    /**
     * Метод валидации обязательных полей
     * @param value - строка
     */
    required(value: string) {
        if (!value) {
            return 'Обязательное поле';
        }

        return true;
    },

    /**
     * Метод валидации максимального количества символов в поле
     * @param value - строка
     * @param maxLength - максимально допустимое количество символов
     */
    maxLength(value: string, maxLength: number) {
        if (value.length > maxLength) {
            return `Не более ${maxLength} символов`;
        }

        return true;
    },
};
