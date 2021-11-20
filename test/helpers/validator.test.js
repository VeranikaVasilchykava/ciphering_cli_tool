const { pipeline } = require('stream');
const fs = require('fs');
const convertStringToStreamsArray = require('../../src/helpers/converter');
const { validateConfig, validateOptions } = require('../../src/helpers/validator');
const { CustomWritableStream, CustomReadableStream } = require('../../src/stream');

describe('Validate config', () => {
  test('throw config error', () => {
    const testWrongConfig = 'C-R1-C0-C0-A-R0-R1-R1-A-C1';
    const testExeededConfig = 'C12-R1-C0';
    const testConfigStartWithHyphen = '-C-R1-C0-C0-A-R0-R1-R1-A-C1';
    const testConfigWithoutHyphen = 'C+R1';
    const testEmptyConfig = '';
    const testConfigWithSingleChar = 'B';
    const testConfigWithTwoChars = 'C3';

    function testWrongConfigFunc() {
      validateConfig(testWrongConfig);
    }
    function testExeededConfigFunc() {
      validateConfig(testExeededConfig);
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

    expect(testExeededConfigFunc).toThrowError();
    expect(testExeededConfigFunc).toThrowError(`Invalid config: should contain some of C0, C1, R0, R1, A instead of ${testExeededConfig}`);

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
});

describe('Validate options', () => {
  test('throw options error', () => {
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

  test('gets "This is secret. Message about "_" symbol!", should return "Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!"', () => {
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

  test('gets "This is secret. Message about "_" symbol!", should return "Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!"', () => {
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

  test('gets "This is secret. Message about "_" symbol!", should return "Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!"', () => {
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

  test('gets "This is secret. Message about "_" symbol!", should return "This is secret. Message about "_" symbol!"', () => {
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
