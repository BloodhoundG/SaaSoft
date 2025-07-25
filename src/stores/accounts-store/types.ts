/**
 * Тип для аккаунта с типом записи local
 */
type LocalAccount = {
    recordType: 'local';
    password: string;
};

/**
 * Тип для аккаунта с типом записи ldap
 */
type LdapAccount = {
    recordType: 'ldap';
    password: null;
};

/**
 * Тип объекта возможного типа записи
 */
export type RecordTypes = {
    readonly key: 'ldap' | 'local';
    readonly name: string;
};

/**
 * Тип объекта метки
 */
export type Mark = { text: string };

/**
 * Тип объекта аккаунта
 */
export type Account = {
    id: string;
    marks: Mark[];
    login: string;
} & (LocalAccount | LdapAccount);

/**
 * Тип модели данных аккаунта
 */
export type AccountModel = Omit<Account, 'marks'> & {
    marks: string;
} & (LocalAccount | LdapAccount);
