const fs = require('fs');
const { PassThrough } = require('stream');
const CustomWritableStream = require('../../src/stream/customWritableStream');

describe('CustomWritableStream', () => {
  const mockFilePath = './output-file.txt';
  const wrongFilePath = './wrong-output.txt';

  beforeEach(() => {
    fs.appendFileSync(mockFilePath, '', (err) => {});
  });

  test('method _write should be defined', () => {
    expect(new CustomWritableStream(mockFilePath)._write).toBeDefined();
  });
  // test('rejects/errors if a stream error occurs', () => {
  //   const mockReadable = new PassThrough()
  //   const mockFilePath = '/oh/what/a/file.txt'

  //   expect(new CustomWritableStream(mockReadable, mockFilePath))

  // })
});
