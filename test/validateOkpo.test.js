const validateOkpo = require("../src/validateOkpo").validateOkpo;
const errors = require("../src/validateOkpo").errors;

const isValid = { isValid: true };

describe("Проверка ОКПО", () => {
  test("Проверка ввода корректного ОКПО", () => {
    expect(validateOkpo("00242766")).toEqual(isValid);
    expect(validateOkpo("00040778")).toEqual(isValid);
    expect(validateOkpo("0164667059")).toEqual(isValid);
    expect(validateOkpo("0193366363")).toEqual(isValid);
  });
  test("Проверка ввода корректного ОКПО с добавлением нулей", () => {
    expect(validateOkpo("242766")).toEqual(isValid);
    expect(validateOkpo("40778")).toEqual(isValid);
    expect(validateOkpo("164667059")).toEqual(isValid);
    expect(validateOkpo("193366363")).toEqual(isValid);
  });

  test("Проверка ввода корректного ОКПО с добавлением нулей(numeric)", () => {
    expect(validateOkpo(242766)).toEqual(isValid);
    expect(validateOkpo(40778)).toEqual(isValid);
    expect(validateOkpo(164667059)).toEqual(isValid);
    expect(validateOkpo(193366363)).toEqual(isValid);
  });

  test("Проверка ввода не корректного ОКПО", () => {
    expect(validateOkpo("")).toEqual({
      isValid: false,
      error: errors.NOT_EMPTY,
    });
    expect(validateOkpo("00242abc")).toEqual({
      isValid: false,
      error: errors.ONLY_NUMBERS,
    });
    expect(validateOkpo("016466705911111111")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateOkpo("00242765")).toEqual({
      isValid: false,
      error: errors.CONTROL_NUMBER_OKPO,
    });
  });
});
