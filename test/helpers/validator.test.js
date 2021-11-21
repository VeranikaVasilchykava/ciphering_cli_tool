const { pipeline } = require('stream');
const fs = require('fs');
const convertStringToStreamsArray = require('../../src/helpers/converter');
const { validateConfig, validateOptions } = require('../../src/helpers/validator');
const { CustomWritableStream, CustomReadableStream } = require('../../src/stream');

describe('Config validator', () => {
  test('should return error if user passes incorrent symbols in argument for --config', () => {
    const testWrongConfig = 'C-R1-C0-C0-A-R0-R1-R1-A-C1';
    const testExeededConfig = 'C12-R1-C0';
    const testConfigWithTwoChars = 'C3';
    const testConfigWithSingleChar = 'B';

    function testWrongConfigFunc() {
      validateConfig(testWrongConfig);
    }
    expect(testWrongConfigFunc).toThrowError();
    expect(testWrongConfigFunc).toThrowError(`Invalid config: should contain some of C0, C1, R0, R1, A instead of ${testWrongConfig}`);

    function testExeededConfigFunc() {
      validateConfig(testExeededConfig);
    }
    expect(testExeededConfigFunc).toThrowError();
    expect(testExeededConfigFunc).toThrowError(`Invalid config: should contain some of C0, C1, R0, R1, A instead of ${testExeededConfig}`);

    function testConfigWithTwoCharsFunc() {
      validateConfig(testConfigWithTwoChars);
    }
    expect(testConfigWithTwoCharsFunc).toThrowError();
    expect(testConfigWithTwoCharsFunc).toThrowError(`Invalid config: should contain some of C0, C1, R0, R1 instead of ${testConfigWithTwoChars}`);

    function testConfigWithSingleCharFunc() {
      validateConfig(testConfigWithSingleChar);
    }
    expect(testConfigWithSingleCharFunc).toThrowError();
    expect(testConfigWithSingleCharFunc).toThrowError(`Invalid config: should contain A instead of ${testConfigWithSingleChar}`);
  });
  test(`should return error if user doesn't pass arguments for --config`, () => {
    const testEmptyConfig = '';
    function testEmptyConfigFunc() {
      validateConfig(testEmptyConfig);
    }
    expect(testEmptyConfigFunc).toThrowError();
    expect(testEmptyConfigFunc).toThrowError(`The config is empty.`);
  });
  test('should return error if user passes incorrent delimiters between chars in --config', () => {
    const testConfigStartWithHyphen = '-C-R1-C0-C0-A-R0-R1-R1-A-C1';
    const testConfigWithoutHyphen = 'C+R1';

    function testConfigStartWithHyphenFunc() {
      validateConfig(testConfigStartWithHyphen);
    }
    expect(testConfigStartWithHyphenFunc).toThrowError();
    expect(testConfigStartWithHyphenFunc).toThrowError('Invalid config: should not start or end with hyphen');

    function testConfigWithoutHyphenFunc() {
      validateConfig(testConfigWithoutHyphen);
    }
    expect(testConfigWithoutHyphenFunc).toThrowError();
    expect(testConfigWithoutHyphenFunc).toThrowError(`Invalid config: doesn't contain hyphen`);
  });
});

describe('Options validator', () => {
  const errorMessageConfig = `Invalid options: use -c or --config, they are required but shouldn't be repeated`;
  const errorMessageInput = `Invalid options: use -i or --input and don't repeat them`;

  test(`should return error if user doesn't pass options`, () => {
    const testEmptyArray = [];
    function testEmptyArrayFunc() {
      validateOptions(testEmptyArray);
    }
    expect(testEmptyArrayFunc).toThrowError();
    expect(testEmptyArrayFunc).toThrowError(/You input empty string/);
  });
  test(`should return error if user doesn't pass required options -c, --config`, () => {
    const testRequiredOptions = ['-i', './input.txt', '-o', './output.txt'];
    function testRequiredOptionsFunc() {
      validateOptions(testRequiredOptions);
    }
    expect(testRequiredOptionsFunc).toThrowError();
    expect(testRequiredOptionsFunc).toThrowError(errorMessageConfig);
  });
  test('should return error if user passes the same option twice', () => {
    const testRepetitiveOptionsOne = ['-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '-i', './input.txt', '-o', './output.txt', '--config', 'C1'];
    const testRepetitiveOptionsTwo = ['-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '-i', './input.txt', '-o', './output.txt', '-c', 'C1'];
    const testRepetitiveOptionsThree = ['-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '-i', './input.txt', '-o', './output.txt', '-i'];

    function testRepetitiveOptionsOneFunc() {
      validateOptions(testRepetitiveOptionsOne);
    }
    function testRepetitiveOptionsTwoFunc() {
      validateOptions(testRepetitiveOptionsTwo);
    }
    function testRepetitiveOptionsThreeFunc() {
      validateOptions(testRepetitiveOptionsThree);
    }
    expect(testRepetitiveOptionsOneFunc).toThrowError();
    expect(testRepetitiveOptionsOneFunc).toThrowError(errorMessageConfig);

    expect(testRepetitiveOptionsTwoFunc).toThrowError();
    expect(testRepetitiveOptionsTwoFunc).toThrowError(errorMessageConfig);

    expect(testRepetitiveOptionsThreeFunc).toThrowError();
    expect(testRepetitiveOptionsThreeFunc).toThrowError(errorMessageInput);
  });
  test('should return error if user passes wrong options', () => {
    const testWrongOptionsOne = ['-b', './input.txt', '-o', './output.txt'];
    const testWrongOptionsTwo = ['--c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '-i', './input.txt', '-o', './output.txt'];

    function testWrongOptionsOneFunc() {
      validateOptions(testWrongOptionsOne);
    }
    expect(testWrongOptionsOneFunc).toThrowError();
    expect(testWrongOptionsOneFunc).toThrowError(errorMessageConfig);

    function testWrongOptionsTwoFunc() {
      validateOptions(testWrongOptionsTwo);
    }
    expect(testWrongOptionsTwoFunc).toThrowError();
    expect(testWrongOptionsTwoFunc).toThrowError(errorMessageConfig);
  });
});


describe('Ciphering CLI Tool', () => {
  const configStringOne = 'C1-C1-R0-A';
  const configStringTwo = 'C1-C0-A-R1-R0-A-R0-R0-C1-A';
  const configStringThree = 'A-A-A-R1-R0-R0-R0-C1-C1-A';
  const configStringFour = 'C1-R1-C0-C0-A-R0-R1-R1-A-C1';
  const inputString = 'This is secret. Message about "_" symbol!';
  const resultOne = 'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!\n';
  const resultTwo = 'Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!\n';
  const resultThree = 'Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!\n';
  const resultFour = 'This is secret. Message about "_" symbol!\n';
  const mockInputFilePath = './test-input.txt';
  const mockOutputFilePath = './test-output.txt';

  beforeEach(() => {
    fs.appendFileSync(mockInputFilePath, inputString, (err) => {});
    fs.appendFileSync(mockOutputFilePath, '', (err) => {});
  });

  afterEach(() => {
    if (fs.existsSync(mockInputFilePath)) {
      fs.writeFileSync(mockInputFilePath, '', () => {});
    }
    if (fs.existsSync(mockOutputFilePath)) {
      fs.writeFileSync(mockOutputFilePath, '', () => {});
    }
  });

  test('should return "Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!" in case of getting "This is secret. Message about "_" symbol!"', () => {
    const readableStream = new CustomReadableStream(mockInputFilePath);
    const writableStream = new CustomWritableStream(mockOutputFilePath);
    const transformStreamsArray = convertStringToStreamsArray(configStringOne);
    const resultReadableStream = fs.createReadStream(mockOutputFilePath, 'utf8');

    pipeline(
      readableStream,
      ...transformStreamsArray,
      writableStream,
      (error) => {
        if (error) {
          process.stderr.write(error);
          process.exit(1);
        }
      }
    )
    resultReadableStream.on('data', (chunk) => {
      expect(chunk.toString()).toBe(resultOne);
    });
  });

  test('should return "Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!" in case of getting "This is secret. Message about "_" symbol!"', () => {
    const readableStream = new CustomReadableStream(mockInputFilePath);
    const writableStream = new CustomWritableStream(mockOutputFilePath);
    const transformStreamsArray = convertStringToStreamsArray(configStringTwo);
    const resultReadableStream = fs.createReadStream(mockOutputFilePath, 'utf8');

    pipeline(
      readableStream,
      ...transformStreamsArray,
      writableStream,
      (error) => {
        if (error) {
          process.stderr.write(error);
          process.exit(1);
        }
      }
    )
    resultReadableStream.on('data', (chunk) => {
      expect(chunk.toString()).toBe(resultTwo);
    });
  });

  test('should return "Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!" in case of getting "This is secret. Message about "_" symbol!"', () => {
    const readableStream = new CustomReadableStream(mockInputFilePath);
    const writableStream = new CustomWritableStream(mockOutputFilePath);
    const transformStreamsArray = convertStringToStreamsArray(configStringThree);
    const resultReadableStream = fs.createReadStream(mockOutputFilePath, 'utf8');

    pipeline(
      readableStream,
      ...transformStreamsArray,
      writableStream,
      (error) => {
        if (error) {
          process.stderr.write(error);
          process.exit(1);
        }
      }
    )
    resultReadableStream.on('data', (chunk) => {
      expect(chunk.toString()).toBe(resultThree);
    });
  });

  test('should return "This is secret. Message about "_" symbol!" in case of getting "This is secret. Message about "_" symbol!"', () => {
    const readableStream = new CustomReadableStream(mockInputFilePath);
    const writableStream = new CustomWritableStream(mockOutputFilePath);
    const transformStreamsArray = convertStringToStreamsArray(configStringFour);
    const resultReadableStream = fs.createReadStream(mockOutputFilePath, 'utf8');

    pipeline(
      readableStream,
      ...transformStreamsArray,
      writableStream,
      (error) => {
        if (error) {
          process.stderr.write(error);
          process.exit(1);
        }
      }
    )
    resultReadableStream.on('data', (chunk) => {
      expect(chunk.toString()).toBe(resultFour);
    });
  });
});
