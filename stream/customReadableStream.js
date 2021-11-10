const fs = require('fs');
const { Readable } = require('stream');
const ValidationError = require('../custom-error');
const { ERROR_MESSAGE } = require('../constants');

class CustomReadableStream extends Readable {
  constructor(input) {
    super();
    this.input = input;
    this.count = 1;
  }
  _read(number) {
    if (!fs.existsSync(this.input)) {
      throw new ValidationError(ERROR_MESSAGE.INPUT.MESSAGE, ERROR_MESSAGE.INPUT.NAME);
    }

    fs.readFile(this.input, 'utf-8', (error, data) => {
      if (error) {
        throw new ValidationError(ERROR_MESSAGE.INPUT.MESSAGE, ERROR_MESSAGE.INPUT.NAME);
      }
      while (this.count > 0) {
        this.push(data);
        this.count--;
      }
    });
  }
}

module.exports = CustomReadableStream;
