const fs = require('fs');
const { Readable } = require('stream');

class CustomReadableStream extends Readable {
  constructor(input) {
    super();
    this.input = input;
    this.fd = null;
  }
  _construct(callback) {
    fs.open(this.input, (err, fd) => {
      if (err) {
        process.stderr.write(err.message);
        process.exit(1);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }
  _read(n) {
    const buf = Buffer.alloc(n);
    fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
      } else {
        this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
      }
    });
  }
  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

module.exports = CustomReadableStream;
