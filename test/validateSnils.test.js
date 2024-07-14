const validateSnils = require("../src/validateSnils").validateSnils;
const errors = require("../src/validateSnils").errors;

const isValid = { isValid: true };

describe("Проверка СНИЛС", () => {
  test("Проверка ввода корректного СНИЛС", () => {
    expect(validateSnils(34293244776)).toEqual(isValid);
    expect(validateSnils("34293244776")).toEqual(isValid);
    expect(validateSnils("342 932 447 76")).toEqual(isValid);
    // 10 сгенерированных СНИЛС
    for (let i = 0; i < 10; i++) {
      const snils = generateSnils();
      expect(validateSnils(snils)).toEqual(isValid);
    }
    // 10 сгенерированных c пробелами СНИЛС
    for (let i = 0; i < 10; i++) {
      const snils = generateSnils();
      expect(validateSnils(mask(snils))).toEqual(isValid);
    }
  });
  test("Проверка ввода не корректного СНИЛС", () => {
    expect(validateSnils("")).toEqual({
      isValid: false,
      error: errors.NOT_EMPTY,
    });
    expect(validateSnils("3429324477")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateSnils("342932447766")).toEqual({
      isValid: false,
      error: errors.COUNT_LENGTH,
    });
    expect(validateSnils("34293244abc")).toEqual({
      isValid: false,
      error: errors.ONLY_NUMBERS,
    });
    expect(validateSnils("34293244777")).toEqual({
      isValid: false,
      error: errors.CONTROL_NUMBER_SNILS,
    });
  });
});

//https://github.com/ortex/snils-generator/blob/master/src/App.js
function generateSnils() {
  const rnd = Math.floor(Math.random() * 999999999);
  const number = leftPad("" + rnd, 9, "0");

  let sum = number
    .split("")
    .map((val, i) => parseInt(val) * (9 - i))
    .reduce((a, b) => a + b);

  if (sum > 101) {
    sum = sum % 101;
  }

  const checkSum = sum == 100 || sum == 101 ? "00" : leftPad("" + sum, 2, "0");
  return number + checkSum;
}

function leftPad(str, len, ch) {
  const length = len - str.length + 1;
  return length > 0 ? new Array(length).join(ch) + str : str;
}

function mask(num) {
  return `${num.substr(0, 3)} ${num.substr(3, 3)} ${num.substr(
    6,
    3
  )} ${num.substr(9)}`;
}
