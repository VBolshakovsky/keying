import { isOnlyNumbers } from "./utils/isOnlyNumbers";

const errors = {
  NOT_EMPTY: "Номер карты не может быть пуст",
  ONLY_NUMBERS: "Номер карты может состоять только из цифр",
  COUNT_LENGTH: "Номер карты должен содержать 16 цифр",
  CONTROL_NUMBER_CARD: "Ошибка ключевания номера карты",
};

type Validation = { 
  check: (cardNumber: string) => boolean
  error: string 
}

const validations: Validation[] = [
  {
    check: (cardNumber) => cardNumber.length > 0,
    error: errors.NOT_EMPTY,
  },
  {
    check: (cardNumber) => cardNumber.length === 16,
    error: errors.COUNT_LENGTH,
  },
  {
    check: (cardNumber) => isOnlyNumbers(cardNumber),
    error: errors.ONLY_NUMBERS,
  },
  {
    check: (cardNumber) => checkLuhn(cardNumber),
    error: errors.CONTROL_NUMBER_CARD,
  },
];

function checkLuhn(ccn: string): boolean {
  const ccnS = ccn.toString();
  let sum = 0;
  const parity = ccnS.length % 2;

  for (let i = 0; i < ccnS.length; i++) {
    let digit = parseInt(ccnS[i]);

    if (i % 2 === parity) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }

  return sum % 10 === 0;
}

type ValidationResult = {
  isValid: boolean;
  error?: string;
}

/**
 * Проверяет валидность номера банковской карты
 *  @param {string, number} cardNumber - Номер банковской карты
 *  @returns объект с флагом isValid и текстом ошибки (если есть)
 *  @description
 *  Банковская карта состоит из 16 цифр(но может от 12 до 19 включительно):
 *      1 цифра — Обозначает систему платежей
 *          2 - Мир
 *          3- American Express, Diners Club и JCB
 *          4 - VISA
 *          5 - MasterCard
 *          6 - Maestro
 *      1-6 или 8-я цифры — Обозначают бане эммитент(BIN/IIN)
 *
 *  Алгоритм проверки контрольного числа
 *      Выполняется алгоритмом Луна
 *      1. Если колличество цифр четное то для каждого (1, 3, 5, 7, 9, …), значение умножается на 2 и если оно больше 9 то вычитается 9,
 *      иначе произведение 2·x оставляем без изменения. Затем все числа, полученные на предыдущем этапе, складываются.
 *      2. Затем все числа, полученные на предыдущем этапе, складываются
 *      3. Полученная сумма должна быть кратна 10 (то есть равна 40, 50, 60, 70, …)
 *      Например:
 *      4012 8888 8888 1881
 *      4 0 1 2 8 8 8 8 8 8 8 8 1 8 8 1
 *      ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   // умножаем 1, 3, 5, 7, 9, … число на 2
 *      8   2  16  16  16  16   2  16   // если результат больше 9 то вычитаем 9
 *              ↓   ↓   ↓   ↓       ↓
 *              7   7   7   7       7
 *      8 0 2 2 7 8 7 8 7 8 7 8 2 8 7 1 // формируем окончательный результат и суммируем
 *
 *      8+0+2+2+7+8+7+8+7+8+7+8+2+8+7+1 = 90 (кратно 10)
 *
 *      Если колличество цифр не четное то для каждого (2, 4, 6, 8, …), последняя цифра контрольная
 **/
function validateCard(cardNumber: string | number): ValidationResult {
  if (typeof cardNumber === "number") {
    cardNumber = cardNumber.toString();
  }

  cardNumber = cardNumber.replace(/\s/g, "");

  let result: ValidationResult = { isValid: true}

  for (const validation of validations) {
    if (!validation.check(cardNumber)) {
      result = { isValid: false, error: validation.error };
      break;
    }
  }

  return result;
}

export { validateCard, errors };

