import { validateBik } from "./validateBik";
import { isOnlyNumbers } from "./utils/isOnlyNumbers";

type Errors = {
  NOT_EMPTY: string;
  ONLY_NUMBERS: string;
  COUNT_LENGTH: string;
  FIRST_THREE_NUMBERS_301: string;
  LAST_THREE_NUMBERS: string;
  CONTROL_NUMBER_ACCOUNT_CORR: string;
}

const errors: Errors = {
  NOT_EMPTY: "Номер корр. счета не может быть пуст",
  ONLY_NUMBERS: "Номер корр. счета должен состоять из 20 цифр",
  COUNT_LENGTH: "Номер корр. счета должен состоять из цифр",
  FIRST_THREE_NUMBERS_301: "Счет должен начинаться с 301",
  LAST_THREE_NUMBERS: "Последние три цифры счета и БИК, должны соответствовать",
  CONTROL_NUMBER_ACCOUNT_CORR: "Ошибка ключевания корр. счета",
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
    check: (account: string) => account.slice(0, 3) === "301",
    error: errors.FIRST_THREE_NUMBERS_301,
  },
  {
check: (account: string, bik: string | number) => ((account.slice(-3) === bik.toString().slice(-3))),
    error: errors.LAST_THREE_NUMBERS,
  },
  {
    check: (account: string, bik: string | number) => getControlSum(account, bik) % 10 === 0,
    error: errors.CONTROL_NUMBER_ACCOUNT_CORR,
  },
];

function getControlSum(account: string, bik: string | number): number {
  const coefficients: number[] = [
    7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1,
  ];
  const bikAndAccount: string = "0" + bik.toString().substring(4, 6) + account;

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
 * Проверяет валидность корреспондентского счета
 *  @param {string} account - Номер корреспондентского счета
 *  @param {string, number} bik - БИК
 *  @returns объект с флагом isValid и текстом ошибки (если есть)
 *  @description
 *  Корреспондентский счет состоит из 20 цифр:
 *      1-3-я цифры — балансовый счёт 1-го порядка, должен быть 301
 *      6-8-я цифры — валюта, в которой открыт счёт, в соответствии с общероссийским классификатором валют
 *      9-я цифры — контрольное число
 *      Последние три цифры, соответствуют 7-му, 8-му, 9-му разрядам БИК
 *
 *  Алгоритм проверки контрольного числа
 *      Для проверки контрольного числа требуется БИК.
 *      Составить 23-значное число из нуля, 5-й и 6-й цифр БИК и корреспондентского счета.
 *      Вычислить сумму младших разрядов произведений цифр 23-значного числа
 *      на следующие коэффициенты — 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1.
 *      Если младший разряд полученной суммы равен 0, то корреспондентский счет считается верным.
 **/
function validateAccCorr(account: string, bik: string | number): ValidationResult {
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

export { validateAccCorr, errors };
