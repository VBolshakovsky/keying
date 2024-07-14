const validateAcc = require("../src/validateAcc").validateAcc;
const errors = require("../src/validateAcc").errors;

const isValid = { isValid: true };

describe("Проверка расчетного счета", () => {
  test("Проверка ввода корректного расчетного счета", () => {
    expect(validateAcc("40703810338000004033", "044525225")).toEqual(isValid);
    expect(validateAcc("40703810438040104602", "044525225")).toEqual(isValid);
    expect(validateAcc("40703810600000011971", "044525659")).toEqual(isValid);
  });

  test("Проверка ввода не корректного расчетного счета", () => {
    expect(validateAcc("", "044525411")).toEqual({
      isValid: false,
      error: errors.NOT_EMPTY,
    });
    expect(validateAcc("4070381000000011698", "044525411")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateAcc("4070381000000011698123", "044525411")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateAcc("40703810000000116asd", "044525411")).toEqual({
      isValid: false,
      error: errors.ONLY_NUMBERS,
    });
    expect(validateAcc("40703810500000011698", "044525411")).toEqual({
      isValid: false,
      error: errors.CONTROL_NUMBER_ACCOUNT,
    });
  });
});
