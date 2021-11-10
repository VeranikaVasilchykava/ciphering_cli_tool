const fs = require('fs');
const { Writable } = require('stream');
const { ERROR_MESSAGE } = require('../constants');
const ValidationError = require('../custom-error');

class CustomWritableStream extends Writable {
  constructor(output) {
    super();
    this.output = output;
  }
  _write(chunk, encoding, callback) {
    if (!fs.existsSync(this.output)) {
      throw new ValidationError(ERROR_MESSAGE.OUTPUT.MESSAGE, ERROR_MESSAGE.OUTPUT.NAME);
    }

    fs.appendFile(this.output, chunk.toString(), (error) => {
      if (error) {
        throw new ValidationError(ERROR_MESSAGE.OUTPUT.MESSAGE, ERROR_MESSAGE.OUTPUT.NAME);
      }
    });

    callback();
  }
}

module.exports = CustomWritableStream;
