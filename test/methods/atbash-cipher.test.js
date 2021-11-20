const atbashCipherHandler = require('../../src/methods/atbash-cipher');

describe('Atbash ciphering', () => {
  test('should keep all not English characters untouched', () => {
    const testString = 'Съешь ещё этих мягких французских булок да выпей чаю. 2021';
    expect(atbashCipherHandler(testString)).toBe(testString);
  });

  test('should code/decode correctly and consider caracter register', () => {
    const testStr = 'AbCdEFGHIJKLMNOPQRSTUVWXyZ';
    const result = 'ZyXwVUTSRQPONMLKJIHGFEDCbA';
    expect(atbashCipherHandler(testStr)).toBe(result);
  });
});
