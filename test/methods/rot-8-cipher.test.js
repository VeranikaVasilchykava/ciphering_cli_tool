const rot8CipherHandler = require('../../src/methods/rot-8-cipher');

describe('ROT-8 ciphering', () => {
  test('should keep all not English characters untouched', () => {
    expect(rot8CipherHandler('/. 20 - грейпфрут', 1)).toBe('/. 20 - грейпфрут');
    expect(rot8CipherHandler('/. 20 - грейпфрут', 0)).toBe('/. 20 - грейпфрут');
  });

  test('should code/decode correctly and consider caracter register', () => {
    expect(rot8CipherHandler('ABCdEfGhIjKLMNOPQRSTUVWXyZ', 1)).toBe('IJKlMnOpQrSTUVWXYZABCDEFgH');
    expect(rot8CipherHandler('iJkLmNoPQRSTUVWXYZABCDEfGH', 0)).toBe('aBcDeFgHIJKLMNOPQRSTUVWxYZ');
  });
});
