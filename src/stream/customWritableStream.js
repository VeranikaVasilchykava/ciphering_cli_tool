const fs = require('fs');
const { Writable } = require('stream');
const { stderr, exit } = process;

class CustomWritableStream extends Writable {
  constructor(output) {
    super();
    this.output = output;
  }
  _write(chunk, encoding, callback) {
    if (!fs.existsSync(this.output)) {
      stderr.write(`OUTPUT_ERROR: there is no acces to ${this.output}`);
      exit(1);
    }

    fs.appendFile(this.output, chunk.toString(), (error) => {
      if (error) {
        stderr.write(`OUTPUT_ERROR: ${error.message}`);
        exit(1);
      }
    });

    callback();
  }
}

module.exports = CustomWritableStream;
