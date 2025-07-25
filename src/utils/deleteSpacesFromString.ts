/**
 * Функция удаляет все пробельные символы из строки
 * @param string - переданная строка
 */
export const deleteSpacesFromString = (string: string) => {
    return string.replace(/\s/g, '');
};
