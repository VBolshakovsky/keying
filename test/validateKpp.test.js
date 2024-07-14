const validateKpp = require("../src/validateKpp").validateKpp;
const errors = require("../src/validateKpp").errors;

const isValid = { isValid: true };

describe("Проверка КПП", () => {
  test("Проверка ввода корректного КПП(number)", () => {
    expect(validateKpp(667101001)).toEqual(isValid);
    expect(validateKpp(502701001)).toEqual(isValid);
  });
  test("Проверка ввода корректного КПП(string)", () => {
    expect(validateKpp("667101001")).toEqual(isValid);
    expect(validateKpp("502701001")).toEqual(isValid);
    expect(validateKpp("5027AB001")).toEqual(isValid);
  });
  test("Проверка ввода не корректного КПП", () => {
    expect(validateKpp("66710100")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateKpp("6671010011")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateKpp("")).toEqual({
      isValid: false,
      error: errors.NOT_EMPTY,
    });
    expect(validateKpp("66aa01001")).toEqual({
      isValid: false,
      error: errors.FIRST_FOUR_CHAR_NUMERIC,
    });
    expect(validateKpp("6671г1001")).toEqual({
      isValid: false,
      error: errors.FIFTH_AND_SIXTH_CHAR_AZ_OR_NUMERIC,
    });
    expect(validateKpp("667101asd")).toEqual({
      isValid: false,
      error: errors.LAST_FOUR_CHAR_NUMERIC,
    });
  });
});
