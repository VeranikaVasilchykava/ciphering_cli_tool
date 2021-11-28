const { Transform } = require('stream');
const rot8CipherHandler = require('../methods/rot-8-cipher');

class Rot8CipherTransphormStream extends Transform {
  constructor(cipher) {
    super();
    this.cipher = cipher;
  }
  _transform(chunk, encode, done) {
    let transformedChunk = '';
    if (this.cipher) {
      transformedChunk = this._rot8CipherTransphorm(chunk.toString(), 1);
    }
    else {
      transformedChunk = this._rot8CipherTransphorm(chunk.toString(), 0);
    }
    this.push(transformedChunk);
    done();
  }
  _rot8CipherTransphorm(str, flag) {
    return rot8CipherHandler(str, flag);
  }
}

module.exports = Rot8CipherTransphormStream;
