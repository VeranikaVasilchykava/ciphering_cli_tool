const fs = require('fs');
const { Writable } = require('stream');

class CustomWritableStream extends Writable {
  constructor(output) {
    super();
    this.output = output;
  }
  _write(chunk, encoding, callback) {
    if (!fs.existsSync(this.output)) {
      process.stderr.write(`There is no acces to ${this.output}`);
      process.exit(1);
    }

    fs.appendFile(this.output, chunk.toString(), (error) => {
      if (error) {
        process.stderr.write(error.message);
        prosecc.exit(1);
      }
    });

    callback();
  }
}

module.exports = CustomWritableStream;
