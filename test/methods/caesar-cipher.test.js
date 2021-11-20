const caesarCipherHandler = require('../../src/methods/caesar-cipher');

describe('Caesar ciphering', () => {
  test('should keep all not English characters untouched', () => {
    const testString = 'Съешь ещё этих мягких французских булок да выпей чаю. 2021';
    expect(caesarCipherHandler(testString, 1)).toBe(testString);
    expect(caesarCipherHandler(testString, 0)).toBe(testString);
  });

  test('should code/decode correctly and consider caracter register', () => {
    const testStrEncode = 'aBCdEFGHIJKLMNOPQRSTUVWxYz';
    const resultEncode = 'bCDeFGHIJKLMNOPQRSTUVWXyZa';
    const testStrDecode = 'BcDeFgHIJKLMNOPQRSTUVWxYZA';
    const resultDecode = 'AbCdEfGHIJKLMNOPQRSTUVwXYZ';
    expect(caesarCipherHandler(testStrEncode, 1)).toBe(resultEncode);
    expect(caesarCipherHandler(testStrDecode, 0)).toBe(resultDecode);
  });
});
