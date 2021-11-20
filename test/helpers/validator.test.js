const { validateConfig, validateOptions } = require('../../src/helpers/validator');

test('Throw config error', () => {
  const testWrongConfig = 'C-R1-C0-C0-A-R0-R1-R1-A-C1';
  const testConfigStartWithHyphen = '-C-R1-C0-C0-A-R0-R1-R1-A-C1';
  const testConfigWithoutHyphen = 'C+R1';
  const testEmptyConfig = '';
  const testConfigWithSingleChar = 'B';
  const testConfigWithTwoChars = 'C3';

  function testWrongConfigFunc() {
    validateConfig(testWrongConfig);
  }
  function testConfigStartWithHyphenFunc() {
    validateConfig(testConfigStartWithHyphen);
  }
  function testConfigWithoutHyphenFunc() {
    validateConfig(testConfigWithoutHyphen);
  }
  function testEmptyConfigFunc() {
    validateConfig(testEmptyConfig);
  }
  function testConfigWithSingleCharFunc() {
    validateConfig(testConfigWithSingleChar);
  }
  function testConfigWithTwoCharsFunc() {
    validateConfig(testConfigWithTwoChars);
  }

  expect(testWrongConfigFunc).toThrowError();
  expect(testWrongConfigFunc).toThrowError(`Invalid config: should contain some of C0, C1, R0, R1, A instead of ${testWrongConfig}`);

  expect(testConfigStartWithHyphenFunc).toThrowError();
  expect(testConfigStartWithHyphenFunc).toThrowError('Invalid config: should not start or end with hyphen');

  expect(testConfigWithoutHyphenFunc).toThrowError();
  expect(testConfigWithoutHyphenFunc).toThrowError(`nvalid config: doesn't contain hyphen`);

  expect(testEmptyConfigFunc).toThrowError();
  expect(testEmptyConfigFunc).toThrowError(`The config is empty.`);

  expect(testConfigWithSingleCharFunc).toThrowError();
  expect(testConfigWithSingleCharFunc).toThrowError(`Invalid config: should contain A instead of ${testConfigWithSingleChar}`);

  expect(testConfigWithTwoCharsFunc).toThrowError();
  expect(testConfigWithTwoCharsFunc).toThrowError(`Invalid config: should contain some of C0, C1, R0, R1 instead of ${testConfigWithTwoChars}`);
});

test('Throw options error', () => {
  const testEmptyArray = [];
  const testRepetitiveOptionsOne = ['-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '-i', './input.txt', '-o', './output.txt', '--config', 'C1'];
  const testRepetitiveOptionsTwo = ['-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '-i', './input.txt', '-o', './output.txt', '-c', 'C1'];
  const testRepetitiveOptionsThree = ['-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '-i', './input.txt', '-o', './output.txt', '-i'];
  const testRequiredOptions = ['-i', './input.txt', '-o', './output.txt'];
  const testWrongOptionsOne = ['-b', './input.txt', '-o', './output.txt'];
  const testWrongOptionsTwo = ['--c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '-i', './input.txt', '-o', './output.txt'];
  const errorMessageConfig = `Invalid options: use -c or --config, they are required but shouldn't be repeated`;
  const errorMessageInput = `Invalid options: use -i or --input and don't repeat them`;

  function testEmptyArrayFunc() {
    validateOptions(testEmptyArray);
  }
  function testRepetitiveOptionsOneFunc() {
    validateOptions(testRepetitiveOptionsOne);
  }
  function testRepetitiveOptionsTwoFunc() {
    validateOptions(testRepetitiveOptionsTwo);
  }
  function testRepetitiveOptionsThreeFunc() {
    validateOptions(testRepetitiveOptionsThree);
  }
  function testRequiredOptionsFunc() {
    validateOptions(testRequiredOptions);
  }
  function testWrongOptionsOneFunc() {
    validateOptions(testWrongOptionsOne);
  }
  function testWrongOptionsTwoFunc() {
    validateOptions(testWrongOptionsTwo);
  }

  expect(testEmptyArrayFunc).toThrowError();
  expect(testEmptyArrayFunc).toThrowError(/You input empty string/);

  expect(testRepetitiveOptionsOneFunc).toThrowError();
  expect(testRepetitiveOptionsOneFunc).toThrowError(errorMessageConfig);

  expect(testRepetitiveOptionsTwoFunc).toThrowError();
  expect(testRepetitiveOptionsTwoFunc).toThrowError(errorMessageConfig);

  expect(testRepetitiveOptionsThreeFunc).toThrowError();
  expect(testRepetitiveOptionsThreeFunc).toThrowError(errorMessageInput);

  expect(testRequiredOptionsFunc).toThrowError();
  expect(testRequiredOptionsFunc).toThrowError(errorMessageConfig);

  expect(testWrongOptionsOneFunc).toThrowError();
  expect(testWrongOptionsOneFunc).toThrowError(errorMessageConfig);

  expect(testWrongOptionsTwoFunc).toThrowError();
  expect(testWrongOptionsTwoFunc).toThrowError(errorMessageConfig);
});
