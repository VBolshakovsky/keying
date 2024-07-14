type Errors = {
    NOT_EMPTY: string;
    ONLY_NUMBERS_AND_LETTERS: string;
    COUNT_LENGTH: string;
    LAST_FOUR_CHAR_NUMERIC: string;
    FALSE_CONTROL_NUMBER: string;
    CONTROL_NUMBER_VIN: string;
  }

const errors: Errors = {
    NOT_EMPTY: "VIN не может быть пуст",
    ONLY_NUMBERS_AND_LETTERS: "VIN может состоять только из цифр и символов A-Z",
    COUNT_LENGTH: "VIN должен быть длиной 17 символов",
    LAST_FOUR_CHAR_NUMERIC: "Последние 4 символа VIN должны быть цифрами",
    FALSE_CONTROL_NUMBER: "Неверный контрольный символ VIN",
    CONTROL_NUMBER_VIN: "Ошибка ключевания VIN",
};

type Validation = { 
 check: (vin: string) => boolean
 error: string 
}

const validations: Validation[] = [
    {
        check: (vin) => vin.length > 0,
        error: errors.NOT_EMPTY,
    },
    {
        check: (vin) => /^[0-9A-Z]*$/.test(vin),
        error: errors.ONLY_NUMBERS_AND_LETTERS,
    },
    {
        check: (vin) => vin.length === 17,
        error: errors.COUNT_LENGTH,
    },
    {
        check: (vin) => /\d{3}$/.test(vin),
        error: errors.LAST_FOUR_CHAR_NUMERIC,
    },
    {
        check: (vin) => /^.{8}[0-9X]/.test(vin),
        error: errors.FALSE_CONTROL_NUMBER,
    },
    {
        check: (vin) => getCalcControlNumber(vin) === getControlNumber(vin),
        error: errors.CONTROL_NUMBER_VIN,
    },
];

function getNearestMultipleOfEleven(num: number): number {
    return Math.floor(num / 11) * 11;
}

function getControlNumber(vin: string): number {
    if (vin[8].toUpperCase() === 'X') {
        return 10;
    } else {
        return parseInt(vin[8], 10);
    }
}

function getCalcControlNumber(vin: string): number {
    const map: { [key: string]: number } = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'J': 1, 'K': 2,
        'L': 3, 'M': 4, 'N': 5, 'P': 7, 'R': 9, 'S': 2, 'T': 3, 'U': 4, 'V': 5, 'W': 6,
        'X': 7, 'Y': 8, 'Z': 9, '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
        '7': 7, '8': 8, '9': 9
    };

    const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

    const controlSum = vin.split('').reduce((acc, char, index) => {
        return acc + (map[char.toUpperCase()] || 0) * weights[index];
    }, 0);

    return controlSum - getNearestMultipleOfEleven(controlSum);
}

type ValidationResult = {
    isValid: boolean;
    error?: string;
  }

/**
* Проверяет валидность VIN
*  @param {string} vin - VIN
*  @returns объект с флагом isValid и текстом ошибки (если есть)
*  @description
*  Идентификационный номер транспортного средства (Vehicle identification number, VIN) состоит из 17 цифр:
*
*  **********************************************************************
*  Внимание! Ключевание VIN, в зависимости от рынка носит рекомендуемый характер.
*
*  В Европе его использование носит рекомендательный характер. 
*  Независимо от рынка контрольный знак обязательно указывается в VIN автомобилей 
*  Mercedes(с 2004), BMW, VOLVO, SAAB, LEXUS, TOYOTA
*  **********************************************************************
*      1-3 символы — WMI (World Manufacturers Identification) — всемирный индекс изготовителя
*            1 символ — географическая зона (Европа, Азия, Африка, Северная Америка и т.д.)
*            2 символ — страна производства
*            3 символ — код завода-изготовителя
*      4-9 символы — VDS ( Vehicle Description Section ) — описательная часть, описывает
*      характеристики автомобиля (тип кузова, модель, серия, двигатель, трансмиссия и др.)
*           9 символ - контрольное число, может быть и цифрой от 0 до 9, и буквой «Х»
*      10-17 символы - VIS ( Vehicle Identifier Section ) 
*           10 символ — год выпуска (1980-2030). До 2000-х годов буквами, далее цифрами,
*           а после опять буквами A, B, C и так далее (Например: X = 1999, Y = 2000, 1 = 2001 ...)
*           11 символ — завод-изготовитель
*           12-17 символы - уникальный номер машины(последние 4 обязательно цифровые)
*
*  Алгоритм проверки контрольного числа


Структуру VIN-кода определяет ISO 3779-1983.

Проверочное число - 9 символ(числа 0-9 или "X")
Если в 9-й позиции находится любой другой знак, то Vin не ключуется

Каждая буква VIN имеет свой цифровой эквивалент, позиция символа — свой вес.

Буква A B C D E F G H J K L M N P R S T U V W X Y Z
Эквивалент 1 2 3 4 5 6 7 8 1 2 3 4 5 7 9 2 3 4 5 6 7 8 9

Позиция 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17
Вес 8 7 6 5 4 3 2 10 0 9 8 7 6 5 4 3 2

1. Подменяем буквы на цифры в соответствии с таблицей
2. Умножаем значения на вес, соответсвующему разраду в соответствии с таблицей
3. Складываем произведения каждого знака VIN на его вес(значение разрада в соответствии с таблицей)
4. Вычисляем ближайшее наименьшее целое число, кратное 11
5. Вычитаем их суммы произведений 3 шага, число из 4 шага

Получившееся число, должно соотвествовать проверочному символу(9-ая позиция). "X" - соответствует 10
**/
function validateVin(vin: string | number): ValidationResult {

    let result: ValidationResult = { isValid: true}

    vin = vin.toString().toUpperCase();

    for (const validation of validations) {
        if (!validation.check(vin)) {
            result = { isValid: false, error: validation.error };
            break;
        }
    }

    return result;
}

export { validateVin, errors };
