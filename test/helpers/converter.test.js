const convertStringToStreamsArray = require('../../src/helpers/converter');

describe('Convert string to stream array', () => {
  const config = '"C1-C0-R0-R1-A';
  test('correctly', () => {
    const type = typeof convertStringToStreamsArray(config);
    const result = convertStringToStreamsArray(config).length;
    expect(type).toBe('object');
    expect(result).toBe(5);
  });
});
