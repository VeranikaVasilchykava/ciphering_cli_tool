const convertStringToStreamsArray = require('../../src/helpers/converter');

describe('Converting a string to stream array', () => {
  test('should woork correctly', () => {
    const config = '"C1-C0-R0-R1-A';
    const type = typeof convertStringToStreamsArray(config);
    const result = convertStringToStreamsArray(config).length;

    expect(type).toBe('object');
    expect(result).toBe(5);
  });
});
