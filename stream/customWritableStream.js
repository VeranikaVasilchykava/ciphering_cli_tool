const { Writable } = require('stream');
const fs = require('fs');
const { ERROR_MESSAGE } = require('../constants');

class CustomWritableStream extends Writable {
  constructor(output) {
    super();
    this.output = output;
  }

  _write(chunk, encoding, callback) {
    if (!fs.existsSync(this.output)) throw Error(ERROR_MESSAGE.OUTPUT);

    fs.appendFile(this.output, chunk.toString(), (error) => {
      if (error) throw Error(ERROR_MESSAGE.OUTPUT);
    });

    callback();
  }
}

module.exports = CustomWritableStream;
