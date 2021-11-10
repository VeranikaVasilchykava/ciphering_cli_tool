const fs = require('fs');
const { Readable } = require('stream');

class CustomReadableStream extends Readable {
  constructor(input) {
    super();
    this.input = input;
    this.count = 1;
  }
  _read(number) {
    fs.readFile(this.input, 'utf-8', (error, data) => {
      if (error) {
        process.stderr.write(error.message);
        process.exit(1);
      }
      while (this.count > 0) {
        this.push(data);
        this.count--;
      }
    });
  }
}

module.exports = CustomReadableStream;
