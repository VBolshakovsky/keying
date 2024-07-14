import { isOnlyNumbers } from "./utils/isOnlyNumbers";

type Errors = {
    NOT_EMPTY: string;
    ONLY_NUMBERS: string;
    COUNT_LENGTH: string;
    CONTROL_NUMBER_OGRN: string;
    CONTROL_NUMBER_OGRN_IP: string;
}

const errors: Errors = {
    NOT_EMPTY: "ОГРН не может быть пуст",
    ONLY_NUMBERS: "ОГРН может состоять только из цифр",
    COUNT_LENGTH: "ОГРН должен быть длиной 13 или 15 цифр",
    CONTROL_NUMBER_OGRN: "Ошибка ключевания ОГРН",
    CONTROL_NUMBER_OGRN_IP: "Ошибка ключевания ОГРНИП",
};
type Validation = { 
  condition?: (ogrn: string) => boolean; 
  check: (ogrn: string) => boolean; 
  error: string
}

const validations: Validation[] = [
    {
        check: (ogrn) => ogrn.length > 0,
        error: errors.NOT_EMPTY,
    },
    {
        check: (ogrn) => isOnlyNumbers(ogrn),
        error: errors.ONLY_NUMBERS,
    },
    {
        check: (ogrn) => [13, 15].includes(ogrn.length),
        error: errors.COUNT_LENGTH,
    },
    {
        condition: (ogrn) => ogrn.length === 13,
        check: (ogrn) => getN13(ogrn) === ogrn.substring(12),
        error: errors.CONTROL_NUMBER_OGRN,
    },
    {
        condition: (ogrn) => ogrn.length === 15,
        check: (ogrn) => getN15(ogrn) === ogrn.substring(14),
        error: errors.CONTROL_NUMBER_OGRN_IP,
    },
];

function getN13(ogrn: string): string {
    return (parseInt(ogrn.substring(0, 12)) % 11).toString().slice(-1);
}

function getN15(ogrn: string): string {
    return (parseInt(ogrn.substring(0, 14)) % 13).toString().slice(-1);
}

type ValidationResult = {
  isValid: boolean;
  error?: string;
}

/**
 * Проверяет валидность ОГРН
 *  @param {string, number} ogrn - ОГРН
 *  @returns объект с флагом isValid и текстом ошибки (если есть)
 *  @description
 *  ОГРН (основной государственный регистрационный номер) состоит из 13 цифр:
 *
 *      1-я цифра — признак отнесения государственного регистрационного номера записи:
 *          к основному государственному регистрационному номеру (ОГРН) — 1, 5;
 *          к основному государственному регистрационному номеру индивидуального предпринимателя (ОГРНИП) — 3;
 *          к государственному регистрационному номеру — 2, 6, 7, 8, 9 (для ЕГРЮЛ), 4 (для ЕГРИП);
 *      2-3-я цифры — две последние цифры года внесения записи;
 *      4-5-я цифры — код субъекта Российской Федерации;
 *      6-12-я цифры — номер записи, внесенной в государственный реестр в течение года;
 *      13-я цифра — контрольное число.
 *
 *  Алгоритм проверки контрольного числа
 *
 *      Выбрать 12-значное число ОГРН (с 1-й по 12-ю цифру).
 *      Вычислить остаток от деления выбранного числа на 11.
 *      Сравнить младший разряд полученного остатка от деления с 13-й цифрой ОГРН. Если они равны,
 *      то ОГРН верный.
 *
 *  ОГРНИП (основной государственный регистрационный номер индивидуального предпринимателя) состоит из 15 цифр:
 *
 *      1-я цифра — признак отнесения государственного регистрационного номера записи:
 *          к основному государственному регистрационному номеру (ОГРН) — 1, 5;
 *          к основному государственному регистрационному номеру индивидуального предпринимателя (ОГРНИП) — 3;
 *          к государственному регистрационному номеру — 2, 6, 7, 8, 9 (для ЕГРЮЛ), 4 (для ЕГРИП);
 *      2-3-я цифры — две последние цифры года внесения записи;
 *      4-5-я цифры — код субъекта Российской Федерации;
 *      6-14-я цифры — номер записи, внесенной в государственный реестр в течение года;
 *      15-я цифра — контрольное число.
 *
 *  Алгоритм проверки контрольного числа
 *
 *      Выбрать 14-значное число ОГРНИП (с 1-й по 14-ю цифру).
 *      Вычислить остаток от деления выбранного числа на 13.
 *      Сравнить младший разряд полученного остатка от деления с 15-й цифрой ОГРНИП. Если они равны,
 *      то ОГРНИП верный.
 **/
function validateOgrn(ogrn: string | number): ValidationResult {
    if (typeof ogrn === "number") {
        ogrn = ogrn.toString();
    }

    let result: ValidationResult = { isValid: true}

    for (const validation of validations) {
        if (!validation.condition || validation.condition(ogrn)) {
            if (!validation.check(ogrn)) {
                result = { isValid: false, error: validation.error };
                break;
            }
        }
    }

    return result;
}

export { validateOgrn, errors };
