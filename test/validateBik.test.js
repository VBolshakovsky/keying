const validateBik = require("../src/validateBik").validateBik;
const errors = require("../src/validateBik").errors;

const isValid = { isValid: true };
describe("Проверка КПП", () => {
  test("Проверка ввода корректного БИК", () => {
    expect(validateBik("044525769")).toEqual(isValid);
    expect(validateBik("044525411")).toEqual(isValid);
    expect(validateBik("044525225")).toEqual(isValid);
    expect(validateBik("044525659")).toEqual(isValid);
    expect(validateBik("044525225")).toEqual(isValid);
    expect(validateBik("044525225")).toEqual(isValid);
  });
  test("Проверка ввода не корректного БИК", () => {
    expect(validateBik("")).toEqual({
      isValid: false,
      error: errors.NOT_EMPTY,
    });
    expect(validateBik("50270100")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateBik("5027010011")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateBik("044525asd")).toEqual({
      isValid: false,
      error: errors.ONLY_NUMBERS,
    });
    expect(validateBik("044525048")).toEqual({
      isValid: false,
      error: errors.LAST_THREE_NUMBERS_050_999,
    });
  });
});
