import { validateBik } from "./validateBik";
import { isOnlyNumbers } from "./utils/isOnlyNumbers";

type Errors = {
  NOT_EMPTY: string;
  ONLY_NUMBERS: string;
  COUNT_LENGTH: string;
  CONTROL_NUMBER_ACCOUNT: string;
}

const errors: Errors = {
  NOT_EMPTY: "Номер счета не может быть пуст",
  ONLY_NUMBERS: "Номер счета должен состоять из 20 цифр",
  COUNT_LENGTH: "Номер счета должен состоять из цифр",
  CONTROL_NUMBER_ACCOUNT: "Ошибка ключевания счета",
};

type Validation = {
  check: (account: string, bik: string | number) => boolean;
  error: string;
}

const validations: Validation[] = [
  {
    check: (account: string) => account.length > 0,
    error: errors.NOT_EMPTY,
  },
  {
    check: (account: string) => account.length === 20,
    error: errors.COUNT_LENGTH,
  },
  {
    check: (account: string) => isOnlyNumbers(account),
    error: errors.ONLY_NUMBERS,
  },
  {
    check: (account: string, bik: string | number) => getControlSum(account, bik) % 10 === 0,
    error: errors.CONTROL_NUMBER_ACCOUNT,
  },
];

function getControlSum(account: string, bik: string | number): number {
  const coefficients: number[] = [
    7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1,
  ];
  const bikAndAccount: string = bik.toString().slice(-3) + account;

  const controlSum: number = [...bikAndAccount].reduce((acc: number, digit: string, index: number) => {
    if (index < 23) {
      return acc + (parseInt(digit) % 10) * coefficients[index];
    }
    return acc;
  }, 0);

  return controlSum;
}

type ValidationResult = {
  isValid: boolean;
  error?: string;
}
/**
 * Проверяет валидность расчетного счета
 *  @param {string} account - Номер расчетного счета
 *  @param {string, number} bik - БИК
 *  @returns объект с флагом isValid и текстом ошибки (если есть)
 *  @description
 *  Расчетный счет состоит из 20 цифр:
 *      1-5-я цифры — балансовый счёт 2-го порядка
 *      6-8-я цифры — валюта, в которой открыт счёт, в соответствии с общероссийским классификатором валют
 *      9-я цифры — контрольное число
 *      10-13-я цифры — банковское подразделение, в котором открыт счёт
 *      13-20-я цифры — номер лицевого счёта
 *
 *  Алгоритм проверки контрольного числа
 *      Для проверки контрольного числа требуется БИК.
 *      Составить 23-значное число из 3-х последних цифр БИК и расчетного счета.
 *      Вычислить сумму младших разрядов произведений цифр 23-значного числа
 *      на следующие коэффициенты — 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1.
 *      Если младший разряд полученной суммы равен 0, то расчетный счет считается верным.
 **/

function validateAcc(account: string, bik: string | number): ValidationResult {
  const { isValid: isBikValid, error: bikError } = validateBik(bik);
  if (!isBikValid) {
    return { isValid: false, error: bikError };
  }

  let result: ValidationResult = { isValid: true}

  for (const validation of validations) {
    if (!validation.check(account, bik)) {
      result = { isValid: false, error: validation.error };
      break;
    }
  }

  return result;
}

export { validateAcc, errors };

