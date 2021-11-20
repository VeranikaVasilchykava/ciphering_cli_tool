const caesarCipherHandler = require('../../src/methods/caesar-cipher');

describe('Caesar ciphering', () => {
  test('should keep all not English characters untouched', () => {
    expect(caesarCipherHandler('/. 20 - грейпфрут', 1)).toBe('/. 20 - грейпфрут');
    expect(caesarCipherHandler('/. 20 - грейпфрут', 0)).toBe('/. 20 - грейпфрут');
  });

  test('should code/decode correctly and consider caracter register', () => {
    expect(caesarCipherHandler('aBCdEFGHIJKLMNOPQRSTUVWxYz', 1)).toBe('bCDeFGHIJKLMNOPQRSTUVWXyZa');
    expect(caesarCipherHandler('BcDeFgHIJKLMNOPQRSTUVWxYZA', 0)).toBe('AbCdEfGHIJKLMNOPQRSTUVwXYZ');
  });
});
