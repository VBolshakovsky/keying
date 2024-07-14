import { isOnlyNumbers } from "./utils/isOnlyNumbers";

type Errors = {
  NOT_EMPTY: string;
  ONLY_NUMBERS: string;
  COUNT_LENGTH: string;
  LAST_THREE_NUMBERS_050_999: string;
}

const errors: Errors = {
  NOT_EMPTY: "БИК не может быть пуст",
  ONLY_NUMBERS: "БИК может состоять только из цифр",
  COUNT_LENGTH: "БИК должен быть длиной 9 символов",
  LAST_THREE_NUMBERS_050_999:
    "Последние 3 символа БИК должны быть цифрами от 050 до 999",
};

type Validation = {
  check: (bik: string) => boolean;
  error: string;
}

const validations: Validation[] = [
  {
    check: (bik: string) => bik.length > 0,
    error: errors.NOT_EMPTY,
  },
  {
    check: (bik: string) => isOnlyNumbers(bik),
    error: errors.ONLY_NUMBERS,
  },
  {
    check: (bik: string) => bik.length === 9,
    error: errors.COUNT_LENGTH,
  },
  {
    check: (bik: string) => /0[5-9][0-9]$|[1-9][0-9]{2}$/.test(bik),
    error: errors.LAST_THREE_NUMBERS_050_999,
  },
];


type ValidationResult = {
  isValid: boolean;
  error?: string;
}

/**
 * Проверяет валидность БИК
 * @param {string, number} bik - строка с БИК
 * @returns объект с флагом isValid и текстом ошибки (если есть)
 * @description
 *  БИК (банковский идентификационный код) состоит из 9 цифр:
 *      1-2-я цифры — код Российской Федерации (используется код 04);
 *      3-4-я цифры — код территории Российской Федерации в соответствии 
 *       с 1-й и 2-й цифрами ОКАТО
 *      5-6-я цифры — условный номер подразделения расчетной сети Банка России,
 *       уникальный в рамках территориального учреждения Банка России,
 *       в составе которого действует данное подразделение расчетной сети Банка России,
 *       или условный номер структурного подразделения Банка России
 *      7-9-я цифры — условный номер кредитной организации (филиала) 
 *       в подразделении расчетной сети Банка России, в котором открыт ее (его) корреспондентский счет (субсчет)
 *       (принимает цифровые значения от 050 до 999).
**/
function validateBik(bik: string | number): ValidationResult {
  if (typeof bik === "number") {
    bik = bik.toString();
  }

  let result: ValidationResult = { isValid: true}

  for (const validation of validations) {
    if (!validation.check(bik)) {
      result = { isValid: false, error: validation.error };
      break;
    }
  }

  return result;
}

export { validateBik, errors };
