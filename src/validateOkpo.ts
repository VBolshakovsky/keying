import { isOnlyNumbers } from "./utils/isOnlyNumbers";
import { addZeros } from "./utils/addZeros";

type Errors = {
    NOT_EMPTY: string;
    ONLY_NUMBERS: string;
    COUNT_LENGTH: string;
    CONTROL_NUMBER_OKPO: string;
}

const errors: Errors = {
    NOT_EMPTY: "ОКПО не может быть пуст",
    ONLY_NUMBERS: "ОКПО может состоять только из цифр",
    COUNT_LENGTH: "ОКПО должен быть длиной 8, 10 или 14 цифр",
    CONTROL_NUMBER_OKPO: "Ошибка ключевания ОКПО",
};

type Validation = { 
  check: (okpo: string) => boolean;
  error: string 
}

const validations: Validation[] = [
    {
        check: (okpo) => okpo.length > 0,
        error: errors.NOT_EMPTY,
    },
    {
        check: (okpo) => isOnlyNumbers(okpo),
        error: errors.ONLY_NUMBERS,
    },
    {
        check: (okpo) => [8, 10, 14].includes(okpo.length),
        error: errors.COUNT_LENGTH,
    },
    {
        check: (okpo) => getCalcControlNumber(okpo) === parseInt(okpo.slice(-1)),
        error: errors.CONTROL_NUMBER_OKPO,
    },
];

function getControlSum(okpo: string, offset: number): number {
    return okpo
        .split("")
        .slice(0, -1)
        .reduce((acc, digit, index) => {
            return acc + parseInt(digit) * (index + offset);
        }, 0) % 11;
}

function getCalcControlNumber(okpo: string): number {
    let controlSum = getControlSum(okpo, 1);

    if (controlSum === 10) {
        controlSum = getControlSum(okpo, 3);
        if (controlSum === 10) {
            return 0;
        }
    }

    return controlSum;
}

type ValidationResult = {
  isValid: boolean;
  error?: string;
}
/**
 * Проверяет валидность ОКПО
 *  @param {string, number} okpo - Номер ОКПО
 *  @returns объект с флагом isValid и текстом ошибки (если есть)
 *  @description
 *  ОКПО (Общероссийский классификатор предприятий и организаций) состоит из 8,10,14 цифр:
 *      ОКПО номер для ЮЛ должен состоять из 8 цифр, для ИП из 10
 *
 *  Алгоритм проверки контрольного числа
 *      Контрольной цифрой кода является последняя цифра — восьмая в восьмизначном коде
 *      и десятая в десятизначном.
 *      Разрядам кода, начиная со старшего разряда, присваивается набор весов,
 *      соответствующий ряду чисел от 1 до 10.
 *      Если разрядность кода больше 10, то набор весов повторяется.
 *      Каждая цифра кода, кроме последней, умножается на вес разряда и вычисляется
 *      сумма полученных произведений.
 *      Контрольное число для кода представляет собой остаток от деления полученной суммы на модуль «11».
 *      Контрольное число должно иметь один разряд, значение которого находится в пределах от 0 до 9.
 *
 *      Если получается остаток, равный 10, то для обеспечения одноразрядного контрольного числа
 *      необходимо провести повторный расчет, применяя вторую последовательность весов,
 *      сдвинутую на два разряда влево (3, 4, 5,…).
 **/
function validateOkpo(okpo: string | number): ValidationResult {
    if (typeof okpo === "number") {
        okpo = okpo.toString();
    }

    okpo = addZeros(okpo);

    let result: ValidationResult = { isValid: true}

    for (const validation of validations) {
        if (!validation.check(okpo)) {
            result = { isValid: false, error: validation.error };
            break;
        }
    }

    return result;
}

export { validateOkpo, errors };
