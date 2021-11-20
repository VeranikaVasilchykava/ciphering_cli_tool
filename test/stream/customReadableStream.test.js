const fs = require('fs');
const CustomReadableStream = require('../../src/stream/customReadableStream');

describe('CustomReadableStream', () => {
  const mockFilePath = './input-file.txt';
  const wrongFilePath = './wrong-input.txt';
  function testWrongInputPath() {
    new CustomReadableStream(wrongFilePath);
  }

  beforeEach(() => {
    fs.appendFileSync(mockFilePath, 'Test content!', (err) => {});
  });

  test('method _read should be defined', () => {
    expect(new CustomReadableStream(mockFilePath)._read).toBeDefined();
  });
  // test('rejects/errors if a stream error occurs', () => {
  //   expect(testWrongInputPath).toThrowError();
  // })
});
