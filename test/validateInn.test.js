const validateInn = require("../src/validateInn").validateInn;
const errors = require("../src/validateInn").errors;

const isValid = { isValid: true };

describe("Проверка ИНН", () => {
  test("Проверка ввода корректного ИНН(10 символов - number)", () => {
    expect(validateInn(6663003127)).toEqual(isValid);
    expect(validateInn(7708503727)).toEqual(isValid);
    expect(validateInn(7736050003)).toEqual(isValid);
    expect(validateInn(7452027843)).toEqual(isValid);
    expect(validateInn(6658021579)).toEqual(isValid);
    expect(validateInn(7725604637)).toEqual(isValid);
    expect(validateInn(4401006984)).toEqual(isValid);
    expect(validateInn(3016003718)).toEqual(isValid);
    expect(validateInn(5053051872)).toEqual(isValid);
  });

  test("Проверка ввода корректного ИНН(10 символов - string)", () => {
    expect(validateInn("6663003127")).toEqual(isValid);
    expect(validateInn("7708503727")).toEqual(isValid);
    expect(validateInn("7736050003")).toEqual(isValid);
    expect(validateInn("7452027843")).toEqual(isValid);
    expect(validateInn("6658021579")).toEqual(isValid);
    expect(validateInn("7725604637")).toEqual(isValid);
    expect(validateInn("4401006984")).toEqual(isValid);
    expect(validateInn("3016003718")).toEqual(isValid);
    expect(validateInn("5053051872")).toEqual(isValid);
  });

  test("Проверка ввода корректного ИНН ИП(12 символов - string)", () => {
    expect(validateInn("561100409545")).toEqual(isValid);
    expect(validateInn("666200351548")).toEqual(isValid);
    expect(validateInn("366512608416")).toEqual(isValid);
    expect(validateInn("773173084809")).toEqual(isValid);
    expect(validateInn("771409116994")).toEqual(isValid);
    expect(validateInn("503115929542")).toEqual(isValid);
    expect(validateInn("773400211252")).toEqual(isValid);
    expect(validateInn("771902452360")).toEqual(isValid);
    expect(validateInn("702100195003")).toEqual(isValid);
  });

  test("Проверка ввода корректного ИНН ИП(12 символов - number)", () => {
    expect(validateInn(561100409545)).toEqual(isValid);
    expect(validateInn(666200351548)).toEqual(isValid);
    expect(validateInn(366512608416)).toEqual(isValid);
    expect(validateInn(773173084809)).toEqual(isValid);
    expect(validateInn(771409116994)).toEqual(isValid);
    expect(validateInn(503115929542)).toEqual(isValid);
    expect(validateInn(773400211252)).toEqual(isValid);
    expect(validateInn(771902452360)).toEqual(isValid);
    expect(validateInn(702100195003)).toEqual(isValid);
  });

  test("Проверка ввода не корректного ИНН", () => {
    expect(validateInn("561100")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateInn("56110040954")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateInn("56110040954111")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateInn("")).toEqual({
      isValid: false,
      error: errors.NOT_EMPTY,
    });
    expect(validateInn("qwerty")).toEqual({
      isValid: false,
      error: errors.ONLY_NUMBERS,
    });
  });
  test("Проверка ошибки контрольного числа ИНН", () => {
    expect(validateInn("6663003126")).toEqual({
      isValid: false,
      error: errors.CONTROL_NUMBER_INN,
    });
  });
  test("Проверка ошибки контрольного числа ИНН ИП", () => {
    expect(validateInn("561100409546")).toEqual({
      isValid: false,
      error: errors.CONTROL_NUMBER_INN_IP,
    });
  });
});
