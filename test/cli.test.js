const { pipeline } = require('stream');
const fs = require('fs');
const convertStringToStreamsArray = require('../src/helpers/converter');
const { CustomWritableStream, CustomReadableStream } = require('../src/stream');

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

  afterEach(() => {
    jest.clearAllMocks();
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

  test('should show error if have no acces to input file', () => {
    const mockExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const mockStdErrSpy = jest.spyOn(process.stderr, 'write').mockImplementation(() => {});
    const wrongFilePath = './wrong-input.txt';

    try {
      fs.openSync(wrongFilePath, 'r');
    }
    catch (error) {
      process.stderr.write('INPUT_ERROR: have no access to the input file');
      process.exit(1);
    }

    expect(mockExitSpy).toHaveBeenCalledWith(1);
    expect(mockStdErrSpy).toHaveBeenCalledWith('INPUT_ERROR: have no access to the input file');
  });

  test('should show error if have no acces to output file', () => {
    const mockExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const mockStdErrSpy = jest.spyOn(process.stderr, 'write').mockImplementation(() => {});
    const wrongFilePath = './wrong-output.txt';

    if (!fs.existsSync(wrongFilePath)) {
      process.stderr.write(`OUTPUT_ERROR: there is no acces to ${wrongFilePath}`);
      process.exit(1);
    }

    expect(mockExitSpy).toHaveBeenCalledWith(1);
    expect(mockStdErrSpy).toHaveBeenCalledWith(`OUTPUT_ERROR: there is no acces to ${wrongFilePath}`);
  });
});
