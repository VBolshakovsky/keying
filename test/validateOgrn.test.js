const validateOgrn = require("../src/validateOgrn").validateOgrn;
const errors = require("../src/validateOgrn").errors;

const isValid = { isValid: true };

describe("Проверка ОГРН", () => {
  test("Проверка ввода корректного ОГРН(13 символов - number)", () => {
    expect(validateOgrn(1026605606620)).toEqual(isValid);
    expect(validateOgrn(5077746725964)).toEqual(isValid);
  });
  test("Проверка ввода корректного ОГРН(13 символов - string)", () => {
    expect(validateOgrn("1026605606620")).toEqual(isValid);
    expect(validateOgrn("5077746725964")).toEqual(isValid);
  });

  test("Проверка ввода корректного ОГРНИП(15 символов - number)", () => {
    expect(validateOgrn(309565808600188)).toEqual(isValid);
    expect(validateOgrn(304667010400037)).toEqual(isValid);
  });
  test("Проверка ввода корректного ОГРНИП(15 символов - string)", () => {
    expect(validateOgrn("309565808600188")).toEqual(isValid);
    expect(validateOgrn("304667010400037")).toEqual(isValid);
  });
  test("Проверка ввода не корректного ОГРН", () => {
    expect(validateOgrn("3095658")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateOgrn("30956580860018")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateOgrn("3095658086001888")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateOgrn("")).toEqual({
      isValid: false,
      error: errors.NOT_EMPTY,
    });
    expect(validateOgrn("qwerty")).toEqual({
      isValid: false,
      error: errors.ONLY_NUMBERS,
    });
  });
  test("Проверка ошибки контрольного числа ОГРН", () => {
    expect(validateOgrn("1026605606621")).toEqual({
      isValid: false,
      error: errors.CONTROL_NUMBER_OGRN,
    });
  });
  test("Проверка ошибки контрольного числа ОГРНИП", () => {
    expect(validateOgrn("309565808600181")).toEqual({
      isValid: false,
      error: errors.CONTROL_NUMBER_OGRN_IP,
    });
  });
});
