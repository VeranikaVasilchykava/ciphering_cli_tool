const { validateConfig, validateOptions } = require('../../src/helpers/validator');
const { ValidationError } = require('../../src/custom-error');

describe('Config validator', () => {
  let mockStdErr;
  let mockExit;

  beforeEach(() => {
    mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    mockStdErr = jest.spyOn(process.stderr, 'write').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Check error message in terminal
   */
  test(`should show error in terminal if user doesn't pass arguments for --config`, () => {
    try {
      validateConfig();
    }
    catch(error) {
      if (error instanceof ValidationError) {
        const { message } = error;
        process.stderr.write(message);
        process.exit(1);
      }
      else {
        throw error;
      }
    }
    expect(mockExit).toHaveBeenCalledWith(1);
    expect(mockStdErr).toHaveBeenCalledWith('EMPTY CONFIG -> The config is empty. Please check usage examples in read.me and try again.');
  });

  test('should show error in terminal if user passes incorrent symbols in argument for --config', () => {
    const testWrongConfig = 'C-R1-C0-C0-A-R0-R1-R1-A-C1';

    try {
      validateConfig(testWrongConfig);
    }
    catch(error) {
      if (error instanceof ValidationError) {
        const { message } = error;
        process.stderr.write(message);
        process.exit(1);
      }
      else {
        throw error;
      }
    }
    expect(mockExit).toHaveBeenCalledWith(1);
    expect(mockStdErr).toHaveBeenCalledWith(`Invalid config: should contain some of C0, C1, R0, R1, A instead of ${testWrongConfig}`);
  });

  test('should show error in terminal if user passes incorrent symbols in argument for --config with single char', () => {
    const testConfigWithSingleChar = 'B';

    try {
      validateConfig(testConfigWithSingleChar);
    }
    catch(error) {
      if (error instanceof ValidationError) {
        const { message } = error;
        process.stderr.write(message);
        process.exit(1);
      }
      else {
        throw error;
      }
    }
    expect(mockExit).toHaveBeenCalledWith(1);
    expect(mockStdErr).toHaveBeenCalledWith(`Invalid config: should contain A instead of ${testConfigWithSingleChar}`);
  });

  test('should show error in terminal if user passes incorrent delimiters between chars in --config', () => {
    const testConfigWithoutHyphen = 'C+R1';
    try {
      validateConfig(testConfigWithoutHyphen);
    }
    catch(error) {
      if (error instanceof ValidationError) {
        const { message } = error;
        process.stderr.write(message);
        process.exit(1);
      }
      else {
        throw error;
      }
    }
    expect(mockExit).toHaveBeenCalledWith(1);
    expect(mockStdErr).toHaveBeenCalledWith(`Invalid config: doesn't contain hyphen`);
  });

  /**
   * Check thrown errors
   */
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
  let mockStdErr;
  let mockExit;

  beforeEach(() => {
    mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    mockStdErr = jest.spyOn(process.stderr, 'write').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Check error message in terminal
   */
  test(`should show error in terminal if user doesn't pass options`, () => {
    const testEmptyArray = [];

    try {
      validateOptions(testEmptyArray);
    }
    catch(error) {
      if (error instanceof ValidationError) {
        const { message } = error;
        process.stderr.write(message);
        process.exit(1);
      }
      else {
        throw error;
      }
    }
    expect(mockExit).toHaveBeenCalledWith(1);
    expect(mockStdErr).toHaveBeenCalledWith('EMPTY DATA: -> You input empty string. Please check usage examples in read.me and try again.');
  });
  test(`should show error in terminal if user doesn't pass required options -c, --config`, () => {
    const testRequiredOptions = ['-i', './input.txt', '-o', './output.txt'];
    try {
      validateOptions(testRequiredOptions);
    }
    catch(error) {
      if (error instanceof ValidationError) {
        const { message } = error;
        process.stderr.write(message);
        process.exit(1);
      }
      else {
        throw error;
      }
    }
    expect(mockExit).toHaveBeenCalledWith(1);
    expect(mockStdErr).toHaveBeenCalledWith(errorMessageConfig);
  });
  test('should show error in terminal if user passes the same option twice', () => {
    const testRepetitiveOptions = ['-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '-i', './input.txt', '-o', './output.txt', '--config', 'C1'];
    try {
      validateOptions(testRepetitiveOptions);
    }
    catch(error) {
      if (error instanceof ValidationError) {
        const { message } = error;
        process.stderr.write(message);
        process.exit(1);
      }
      else {
        throw error;
      }
    }
    expect(mockExit).toHaveBeenCalledWith(1);
    expect(mockStdErr).toHaveBeenCalledWith(errorMessageConfig);
  });
  test('should show error in terminal if user passes wrong options', () => {
    const testWrongOptions = ['-b', './input.txt', '-o', './output.txt'];

    try {
      validateOptions(testWrongOptions);
    }
    catch(error) {
      if (error instanceof ValidationError) {
        const { message } = error;
        process.stderr.write(message);
        process.exit(1);
      }
      else {
        throw error;
      }
    }
    expect(mockExit).toHaveBeenCalledWith(1);
    expect(mockStdErr).toHaveBeenCalledWith(errorMessageConfig);
  });

  /**
   * Check thrown errors
   */
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
