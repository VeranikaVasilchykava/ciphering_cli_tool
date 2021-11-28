const { parseChar, argsParser } = require('../../src/helpers/parser');

describe('Char parser', () => {
  test('should parse chars depending on register to object', () => {
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
});

describe('Arguments parser', () => {
  test('should parse arguments to object', () => {
    const testShortNameArgs = ['-c', 'C1-C1-R0-A', '-i', './input.txt', '-o', './output.txt'];
    const testFullNameArgs = ['--config', 'C1-C1-R0-A', '--input', './input.txt', '--output', './output.txt'];
    expect(argsParser(testShortNameArgs)).toStrictEqual({
      config: 'C1-C1-R0-A',
      input: './input.txt',
      output: './output.txt'
    });
    expect(argsParser(testFullNameArgs)).toStrictEqual({
      config: 'C1-C1-R0-A',
      input: './input.txt',
      output: './output.txt'
    });
  });

  test('should throw error in case of getting empty arguments array', () => {
    const testEmptyArgumentsArray = [];

    function testEmptyArgumentsArrayFunc() {
      argsParser(testEmptyArgumentsArray);
    }

    expect(testEmptyArgumentsArrayFunc).toThrowError();
    expect(testEmptyArgumentsArrayFunc).toThrowError('You input empty string');
  });
});
