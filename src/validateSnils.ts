import { isOnlyNumbers } from "./utils/isOnlyNumbers";

type Errors = {
  NOT_EMPTY: string;
  ONLY_NUMBERS: string;
  COUNT_LENGTH: string;
  CONTROL_NUMBER_SNILS: string;
}

const errors: Errors = {
  NOT_EMPTY: "СНИЛС не может быть пуст",
  ONLY_NUMBERS: "СНИЛС может состоять только из цифр",
  COUNT_LENGTH: "СНИЛС должен содержать 11 цифр",
  CONTROL_NUMBER_SNILS: "Ошибка ключевания СНИЛС",
};

type Validation = { check: (snils: string) => boolean; error: string }

const validations: Validation[] = [
  {
      check: (snils: string) => snils.length > 0,
      error: errors.NOT_EMPTY,
  },
  {
      check: (snils: string) => isOnlyNumbers(snils),
      error: errors.ONLY_NUMBERS,
  },
  {
      check: (snils: string) => snils.length === 11,
      error: errors.COUNT_LENGTH,
  },
  {
      check: (snils: string) =>
          getCalcControlNumber(snils) === parseInt(snils.slice(-2)),
      error: errors.CONTROL_NUMBER_SNILS,
  },
];

function getCalcControlNumber(snils: string): number {
  const controlSum = snils
      .slice(0, 9)
      .split("")
      .reverse()
      .reduce((acc, digit, index) => {
          return acc + parseInt(digit) * (index + 1);
      }, 0);

  let checkControlNumber: number;
  if (controlSum < 100) {
      checkControlNumber = controlSum;
  } else if (controlSum === 100) {
      checkControlNumber = 0;
  } else {
      const remainder = controlSum % 101;
      if (remainder === 100) {
          checkControlNumber = 0;
      } else {
          checkControlNumber = remainder;
      }
  }

  return checkControlNumber;
}

type ValidationResult = {
  isValid: boolean;
  error?: string;
}


/**
 * Проверяет валидность СНИЛС
 *  @param {string, number} snils - Номер СНИЛС
 *  @returns объект с флагом isValid и текстом ошибки (если есть)
 *  @description
 *  СНИЛС (страховой номер индивидуального лицевого счета) состоит из 11 цифр:
 *      1-9-я цифры — любые цифры;
 *      10-11-я цифры — контрольное число
 *
 *  Алгоритм проверки контрольного числа
 *
 *      Вычислить сумму произведений цифр СНИЛС (с 1-й по 9-ю) на следующие
 *      коэффициенты — 9, 8, 7, 6, 5, 4, 3, 2, 1 (т.е. номера цифр в обратном порядке).
 *      Вычислить контрольное число от полученной суммы следующим образом:
 *          если она меньше 100, то контрольное число равно этой сумме;
 *          если равна 100, то контрольное число равно 0;
 *          если больше 100, то вычислить остаток от деления на 101 и далее:
 *              если остаток от деления равен 100, то контольное число равно 0;
 *              в противном случае контрольное число равно вычисленному остатку от деления.
 *      Сравнить полученное контрольное число с двумя младшими разрядами СНИЛС.
 *      Если они равны, то СНИЛС верный.
 **/

function validateSnils(snils: string | number): ValidationResult {
  if (typeof snils === "number") {
      snils = snils.toString();
  }

  snils = snils.replace(/\s/g, "");

  let result: ValidationResult = { isValid: true}

  for (const validation of validations) {
      if (!validation.check(snils)) {
          result = { isValid: false, error: validation.error };
          break;
      }
  }

  return result;
}

export { validateSnils, errors };
