const validateAccCorr = require("../src/validateAccCorr").validateAccCorr;
const errors = require("../src/validateAccCorr").errors;

const isValid = { isValid: true };

describe("Проверка корреспонденского счета", () => {
  test("Проверка ввода корректного корреспонденского счета", () => {
    expect(validateAccCorr("30101810400000000225", "044525225")).toEqual(
      isValid
    );
    expect(validateAccCorr("30101810145250000411", "044525411")).toEqual(
      isValid
    );
    expect(validateAccCorr("30101810745250000659", "044525659")).toEqual(
      isValid
    );
  });

  test("Проверка ввода не корректного корреспонденского счета", () => {
    expect(validateAccCorr("", "044525225")).toEqual({
      isValid: false,
      error: errors.NOT_EMPTY,
    });
    expect(validateAccCorr("3010181040000000022", "044525225")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateAccCorr("301018104000000002255", "044525225")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateAccCorr("30101810400000000aaa", "044525225")).toEqual({
      isValid: false,
      error: errors.ONLY_NUMBERS,
    });
    expect(validateAccCorr("30101810400000000225", "044525221")).toEqual({
      isValid: false,
      error: errors.LAST_THREE_NUMBERS,
    });
    expect(validateAccCorr("30201810400000000225", "044525225")).toEqual({
      isValid: false,
      error: errors.FIRST_THREE_NUMBERS_301,
    });
    expect(validateAccCorr("30101810500000000225", "044525225")).toEqual({
      isValid: false,
      error: errors.CONTROL_NUMBER_ACCOUNT_CORR,
    });
  });
});
