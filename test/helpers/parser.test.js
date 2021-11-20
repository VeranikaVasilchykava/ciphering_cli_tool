const { parseChar, argsParser } = require('../../src/helpers/parser');

describe('Test parser:', () => {
  test('chars should be parsed depending on register to object', () => {
    expect(parseChar('G')).toStrictEqual({
      charCode: 71,
      aCode: 65,
      zCode: 90
    });
    expect(parseChar('g')).toStrictEqual({
      charCode: 103,
      aCode: 97,
      zCode: 122
    });
  });

  test('arguments should be parsed to object', () => {
    const testArgs = ['-c', 'C1-C1-R0-A', '-i', './input.txt', '-o', './output.txt'];
    const testFullArgs = ['--config', 'C1-C1-R0-A', '--input', './input.txt', '--output', './output.txt'];
    expect(argsParser(testArgs)).toStrictEqual({
      config: 'C1-C1-R0-A',
      input: './input.txt',
      output: './output.txt'
    });
    expect(argsParser(testFullArgs)).toStrictEqual({
      config: 'C1-C1-R0-A',
      input: './input.txt',
      output: './output.txt'
    });
  });

  test('throw error', () => {
    const testEmptyArgumentsArray = [];

    function testEmptyArgumentsArrayFunc() {
      argsParser(testEmptyArgumentsArray);
    }

    expect(testEmptyArgumentsArrayFunc).toThrowError();
    expect(testEmptyArgumentsArrayFunc).toThrowError('You input empty string');

  });
});
