import type { Mark } from '@/stores/accounts-store/types.ts';

/**
 * Объект содержит методы форматирования меток
 */
export const formatMarks = {
    /**
     * Метод преобразует массив меток в строку с разделителем ';' и возвращает строку
     * @param marksArray
     */
    stringify(marksArray: Mark[]): string {
        return marksArray.map((markItem) => markItem.text).join(';');
    },

    /**
     * Метод преобразует строку меток в массив объектов и возвращает его
     * @param marksString
     */
    parse(marksString: string): Mark[] {
        return marksString
            .split(';')
            .map((mark) => ({ text: mark }))
            .filter((mark) => mark.text);
    },
};
