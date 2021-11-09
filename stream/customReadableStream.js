const { Readable } = require('stream');
const fs = require('fs');
const { ERROR_MESSAGE } = require('../constants');

class CustomReadableStream extends Readable {
  constructor(input) {
    super();
    this.input = input;
    this.count = 1;
  }

  _read(number) {
    if (!fs.existsSync(this.input)) throw Error(ERROR_MESSAGE.INPUT);

    fs.readFile(this.input, 'utf-8', (error, data) => {
      if (error) throw Error(ERROR_MESSAGE.INPUT);
      while (this.count > 0) {
        this.push(data);
        this.count--;
      }
    });
  }
}

module.exports = CustomReadableStream;
