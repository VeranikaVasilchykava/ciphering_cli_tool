const { Transform } = require('stream');
const atbashCipherHandler = require('../methods/atbash-cipher');

class AtbashCipherTransphormStream extends Transform {
  constructor() {
    super();
  }
  _transform(chunk, encode, done) {
    const transformedChunk = this._atbashCipherTransphorm(chunk.toString());
    this.push(transformedChunk);
    done();
  }
  _atbashCipherTransphorm(str) {
    return atbashCipherHandler(str);
  }
}

module.exports = AtbashCipherTransphormStream;
