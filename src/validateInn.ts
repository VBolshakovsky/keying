import { isOnlyNumbers } from "./utils/isOnlyNumbers";

type Errors = {
  NOT_EMPTY: string;
  ONLY_NUMBERS: string;
  COUNT_LENGTH: string;
  CONTROL_NUMBER_INN: string;
  CONTROL_NUMBER_INN_IP: string;
}

const errors: Errors = {
  NOT_EMPTY: "ИНН не может быть пуст",
  ONLY_NUMBERS: "ИНН может состоять только из цифр",
  COUNT_LENGTH: "ИНН должен быть длиной 10 или 12 цифр",
  CONTROL_NUMBER_INN: "Ошибка ключевания ИНН",
  CONTROL_NUMBER_INN_IP: "Ошибка ключевания ИНН ИП",
};

type Validation = {
  condition? (inn: string): boolean;
  check(inn: string): boolean;
  error: string;
}

const validations: Validation[] = [
  {
    check: (inn: string) => inn.length > 0,
    error: errors.NOT_EMPTY,
  },
  {
    check: (inn: string) => isOnlyNumbers(inn),
    error: errors.ONLY_NUMBERS,
  },
  {
    check: (inn: string) => [10, 12].includes(inn.length),
    error: errors.COUNT_LENGTH,
  },
  {
    condition: (inn: string) => inn.length === 10,
    check: (inn: string) => getN10(inn) === parseInt(inn[9], 10),
    error: errors.CONTROL_NUMBER_INN,
  },
  {
    condition: (inn: string) => inn.length === 12,
    check: (inn: string) =>
      parseInt(inn[10], 10) === getN11(inn) &&
      parseInt(inn[11], 10) === getN12(inn),
    error: errors.CONTROL_NUMBER_INN_IP,
  },
];

function getControlNumber(numbers: number[], inn: string): number {
  return (
    (numbers.reduce(
      (acc, curr, index) => acc + curr * parseInt(inn[index], 10),
      0
    ) %
      11) %
      10
  );
}

function getN10(inn: string): number {
  return getControlNumber([2, 4, 10, 3, 5, 9, 4, 6, 8], inn);
}

function getN11(inn: string): number {
  return getControlNumber([7, 2, 4, 10, 3, 5, 9, 4, 6, 8], inn);
}

function getN12(inn: string): number {
  return getControlNumber([3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8], inn);
}

type ValidationResult = {
  isValid: boolean;
  error?: string;
}

/**
 * Проверяет валидность ИНН
 *  @param {string, number} inn - ИНН
 *  @returns объект с флагом isValid и текстом ошибки (если есть)
 *  @description
 *  ИНН (идентификационный номер налогоплательщика) организации состоит из 10 цифр:
 *      1-4-я цифры:
 *          для российской организации — код налогового органа, который присвоил ИНН;
 *          для иностранной организации — индекс, определяемый Федеральной налоговой службой;
 *      5-9-я цифры:
 *          для российской организации — порядковый номер записи о лице
 *          в территориальном разделе Единого государственного реестра налогоплательщиков налогового органа,
 *          который присвоил ИНН;
 *
 *          для иностранной организации — код иностранной организации (КИО)
 *          согласно Справочнику «Коды иностранных организаций»;
 *      10-я цифра — контрольное число.
 *
 *  Алгоритм проверки контрольного числа
 *
 *      Вычислить сумму произведений цифр ИНН (с 1-й по 9-ю) на следующие коэффициенты — 2, 4, 10, 3, 5, 9, 4, 6, 8
 *      (т.е. 2 * ИНН[1] + 4 * ИНН[2] + ...).
 *      Вычислить остаток от деления полученной суммы на 11.
 *      Сравнить младший разряд полученного остатка от деления с младшим разрядом ИНН.
 *      Если они равны, то ИНН верный.
 *
 *  ИНН физического лица (индивидуального предпринимателя) состоит из 12 цифр:
 *      1-4-я цифры — код налогового органа, который присвоил ИНН;
 *      5-10-я цифры — порядковый номер записи о лице в территориальном разделе
 *      Единого государственного реестра налогоплательщиков налогового органа, который присвоил ИНН;
 *      11-12-я цифры — контрольное число.
 *
 *  Алгоритм проверки контрольного числа
 *
 *      Вычислить 1-ю контрольную цифру:
 *          Вычислить сумму произведений цифр ИНН (с 1-й по 10-ю) на следующие коэффициенты — 7, 2, 4, 10, 3, 5, 9, 4, 6, 8
 *          (т.е. 7 * ИНН[1] + 2 * ИНН[2] + ...).
 *          Вычислить младший разряд остатка от деления полученной суммы на 11.
 *      Вычислить 2-ю контрольную цифру:
 *          Вычислить сумму произведений цифр ИНН (с 1-й по 11-ю) на следующие коэффициенты — 3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8
 *          (т.е. 3 * ИНН[1] + 7 * ИНН[2] + ...).
 *          Вычислить младший разряд остатка от деления полученной суммы на 11.
 *      Сравнить 1-ю контрольную цифру с 11-й цифрой ИНН и сравнить 2-ю контрольную цифру с 12-й цифрой ИНН.
 *      Если они равны, то ИНН верный.
 **/
function validateInn(inn: string | number): ValidationResult {
  if (typeof inn === "number") {
    inn = inn.toString();
  }

  let result: ValidationResult = { isValid: true}

  for (const validation of validations) {
    if (validation.condition ? validation.condition(inn) : true) {
      if (!validation.check(inn)) {
        result = { isValid: false, error: validation.error };
        break;
      }
    }
  }

  return result;
}

export { validateInn, errors };