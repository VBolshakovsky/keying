const validateVin = require("../src/validateVin").validateVin;
const errors = require("../src/validateVin").errors;

const isValid = { isValid: true };

describe("Проверка VIN", () => {
  test("Проверка ввода корректного VIN", () => {
    expect(validateVin("JHMCM56557C404453")).toEqual(isValid);
  });
  test("Проверка ввода не корректного VIN", () => {
    expect(validateVin("")).toEqual({
      isValid: false,
      error: errors.NOT_EMPTY,
    });
    expect(validateVin("JHMCM56557C40445")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateVin("JHMCM56557C4044533")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateVin("JHMCM56557C40445D")).toEqual({
      isValid: false,
      error: errors.LAST_FOUR_CHAR_NUMERIC,
    });
    expect(validateVin("JHMCM565D7C404453")).toEqual({
      isValid: false,
      error: errors.FALSE_CONTROL_NUMBER,
    });
    expect(validateVin("JHMCM56547C404453")).toEqual({
      isValid: false,
      error: errors.CONTROL_NUMBER_VIN,
    });
  });
});
