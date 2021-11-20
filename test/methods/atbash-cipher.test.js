const atbashCipherHandler = require('../../src/methods/atbash-cipher');

describe('Atbash ciphering', () => {
  test('should keep all not English characters untouched', () => {
    expect(atbashCipherHandler('/. 20 - грейпфрут')).toBe('/. 20 - грейпфрут');
  });

  test('should code/decode correctly and consider caracter register', () => {
    expect(atbashCipherHandler('AbCdEFGHIJKLMNOPQRSTUVWXyZ')).toBe('ZyXwVUTSRQPONMLKJIHGFEDCbA');
  });
});
