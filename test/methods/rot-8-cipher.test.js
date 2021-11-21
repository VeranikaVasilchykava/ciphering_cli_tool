const rot8CipherHandler = require('../../src/methods/rot-8-cipher');

describe('ROT-8 ciphering', () => {
  test('should keep all not English characters untouched', () => {
    const testString = 'Съешь ещё этих мягких французских булок да выпей чаю. 2021';
    expect(rot8CipherHandler(testString, 1)).toBe(testString);
    expect(rot8CipherHandler(testString, 0)).toBe(testString);
  });

  test('should endecode correctly and consider caracter register', () => {
    const testStrEncode = 'ABCdEfGhIjKLMNOPQRSTUVWXyZ';
    const resultEncode = 'IJKlMnOpQrSTUVWXYZABCDEFgH';
    expect(rot8CipherHandler(testStrEncode, 1)).toBe(resultEncode);
  });

  test('should decode correctly and consider caracter register', () => {
    const testStrDecode = 'iJkLmNoPQRSTUVWXYZABCDEfGH';
    const resultDecode = 'aBcDeFgHIJKLMNOPQRSTUVWxYZ';
    expect(rot8CipherHandler(testStrDecode, 0)).toBe(resultDecode);
  });
});
