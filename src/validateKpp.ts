type Errors = {
    NOT_EMPTY: string;
    COUNT_LENGTH: string;
    FIRST_FOUR_CHAR_NUMERIC: string;
    FIFTH_AND_SIXTH_CHAR_AZ_OR_NUMERIC: string;
    LAST_FOUR_CHAR_NUMERIC: string;
}

const errors: Errors = {
    NOT_EMPTY: "КПП не может быть пуст",
    COUNT_LENGTH: "КПП должен быть длиной 9 символов",
    FIRST_FOUR_CHAR_NUMERIC: "Первые 4 символа КПП должны быть цифрами",
    FIFTH_AND_SIXTH_CHAR_AZ_OR_NUMERIC: "5-6-й знаки КПП должны быть цифрами или буквами от A до Z",
    LAST_FOUR_CHAR_NUMERIC: "Последние 4 символа КПП должны быть цифрами",
};

type Validation = {
    check: (kpp: string) => boolean;
    error: string;
}

const validations: Validation[] = [
    {
        check: (kpp: string) => kpp.length > 0,
        error: errors.NOT_EMPTY,
    },
    {
        check: (kpp: string) => kpp.length === 9,
        error: errors.COUNT_LENGTH,
    },
    {
        check: (kpp: string) => /^\d{4}/.test(kpp),
        error: errors.FIRST_FOUR_CHAR_NUMERIC,
    },
    {
        check: (kpp: string) => /^\d{4}[0-9A-Z]{2}/.test(kpp),
        error: errors.FIFTH_AND_SIXTH_CHAR_AZ_OR_NUMERIC,
    },
    {
        check: (kpp: string) => /\d{3}$/.test(kpp),
        error: errors.LAST_FOUR_CHAR_NUMERIC,
    },
];

type ValidationResult = {
    isValid: boolean;
    error?: string;
  }
/**
* Проверяет валидность КПП
*  @param {string, number} kpp - КПП
*  @returns объект с флагом isValid и текстом ошибки (если есть)
*  @description
*  КПП (код причины постановки на учет) состоит из 9 знаков:
*      1-4-я цифры — код налогового органа, который осуществил постановку
*        на учет организации или осуществил учет сведений в отношении организации;
*      5-6-й знаки — причина постановки на учет (учета сведений), 
*        представляют собой цифры или заглавные буквы латинского алфавита от A до Z.
*        Числовое значение двух знаков может принимать значение:
*          для российской организации — от 01 до 50 (01 — по месту ее нахождения);
*          для иностранной организации — от 51 до 99;
*      7-9-я цифры — порядковый номер постановки на учет (учета сведений) в налоговом органе
**/
function validateKpp(kpp: string | number): ValidationResult {

    if (typeof kpp === "number") {
        kpp = kpp.toString();
      }

    let result: ValidationResult = { isValid: true}

    for (const validation of validations) {
        if (!validation.check(kpp)) {
            result = { isValid: false, error: validation.error };
            break;
        }
    }

    return result;
}

export { validateKpp, errors };
