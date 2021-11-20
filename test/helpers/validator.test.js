const { validateConfig, validateOptions } = require('../../src/helpers/validator');

test('Throw config error', () => {
  const testWrongConfig = 'C-R1-C0-C0-A-R0-R1-R1-A-C1';
  const testEmptyConfig = '';
  const testConfigWithSingleChar = 'B';
  const testConfigWithTwoChars = 'C3';

  function testWrongConfigFunc() {
    validateConfig(testWrongConfig);
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
  expect(testWrongConfigFunc).toThrowError(/is invalid/);
  expect(testWrongConfigFunc).toThrowError(`The config ${testWrongConfig} is invalid`);

  expect(testEmptyConfigFunc).toThrowError();
  expect(testEmptyConfigFunc).toThrowError(/is empty/);
  expect(testEmptyConfigFunc).toThrowError(`The config is empty.`);

  expect(testConfigWithSingleCharFunc).toThrowError();
  expect(testConfigWithSingleCharFunc).toThrowError(/is invalid/);
  expect(testConfigWithSingleCharFunc).toThrowError(`The config ${testConfigWithSingleChar} is invalid`);

  expect(testConfigWithTwoCharsFunc).toThrowError();
  expect(testConfigWithTwoCharsFunc).toThrowError(/is invalid/);
  expect(testConfigWithTwoCharsFunc).toThrowError(`The config ${testConfigWithTwoChars} is invalid`);
});

test('Throw options error', () => {
  const testRepetitiveOptionsOne = ['-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '-i', './input.txt', '-o', './output.txt', '--config', 'C1'];
  const testRepetitiveOptionsTwo = ['-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '-i', './input.txt', '-o', './output.txt', '-c', 'C1'];
  const testRepetitiveOptionsThree = ['-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '-i', './input.txt', '-o', './output.txt', '-i'];
  const testRequiredOptions = ['-i', './input.txt', '-o', './output.txt'];
  const testWrongOptionsOne = ['-b', './input.txt', '-o', './output.txt'];
  const testWrongOptionsTwo = ['--c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '-i', './input.txt', '-o', './output.txt'];

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

  expect(testRepetitiveOptionsOneFunc).toThrowError();
  expect(testRepetitiveOptionsOneFunc).toThrowError(/are invalid/);
  expect(testRepetitiveOptionsOneFunc).toThrowError(`The options ${testRepetitiveOptionsOne} are invalid`);

  expect(testRepetitiveOptionsTwoFunc).toThrowError();
  expect(testRepetitiveOptionsTwoFunc).toThrowError(/are invalid/);
  expect(testRepetitiveOptionsTwoFunc).toThrowError(`The options ${testRepetitiveOptionsTwo} are invalid`);

  expect(testRepetitiveOptionsThreeFunc).toThrowError();
  expect(testRepetitiveOptionsThreeFunc).toThrowError(/are invalid/);
  expect(testRepetitiveOptionsThreeFunc).toThrowError(`The options ${testRepetitiveOptionsThree} are invalid`);

  expect(testRequiredOptionsFunc).toThrowError();
  expect(testRequiredOptionsFunc).toThrowError(/are invalid/);
  expect(testRequiredOptionsFunc).toThrowError(`The options ${testRequiredOptions} are invalid`);

  expect(testWrongOptionsOneFunc).toThrowError();
  expect(testWrongOptionsOneFunc).toThrowError(/are invalid/);
  expect(testWrongOptionsOneFunc).toThrowError(`The options ${testWrongOptionsOne} are invalid`);

  expect(testWrongOptionsTwoFunc).toThrowError();
  expect(testWrongOptionsTwoFunc).toThrowError(/are invalid/);
  expect(testWrongOptionsTwoFunc).toThrowError(`The options ${testWrongOptionsTwo} are invalid`);
})
