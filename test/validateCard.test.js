const validateCard = require("../src/validateCard").validateCard;
const errors = require("../src/validateCard").errors;

const isValid = { isValid: true };

describe("Проверка номера карты", () => {
  test("Проверка ввода корректного номера карты", () => {
    expect(validateCard("4012888888881881")).toEqual(isValid);
    expect(validateCard("5467929858074128")).toEqual(isValid);
    expect(validateCard(4012888888881881)).toEqual(isValid);
    expect(validateCard(5467929858074128)).toEqual(isValid);

    expect(validateCard("4627100101654724")).toEqual(isValid);
    expect(validateCard("4012 8888 8888 1881")).toEqual(isValid);
    expect(validateCard("54679298 58074128")).toEqual(isValid);
    expect(validateCard("4627 1001 0165 4724")).toEqual(isValid);
  });

  test("Проверка ввода не корректного номера карты", () => {
    expect(validateCard("")).toEqual({
      isValid: false,
      error: errors.NOT_EMPTY,
    });
    expect(validateCard("40128888888818811")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateCard("401288888888188")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateCard("4012 8888 8888 188")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateCard("4012 8888 8888 1881 1")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateCard("4012888888881abc")).toEqual({
      isValid: false,
      error: errors.ONLY_NUMBERS,
    });
    expect(validateCard("4012 8888 8888 1abc")).toEqual({
      isValid: false,
      error: errors.ONLY_NUMBERS,
    });
    expect(validateCard("4012888888881880")).toEqual({
      isValid: false,
      error: errors.CONTROL_NUMBER_CARD,
    });
  });
});

// Примеры карт
// https://docs.assist.ru/pages/viewpage.action?pageId=5767473
// https://rbkmoney.github.io/docs/docs/payments/refs/testcards.html
