const { Transform } = require('stream');
const caesarCipherHandler = require('../methods/caesar-cipher');

class CaesarCipherTransphormStream extends Transform {
  constructor(cipher) {
    super();
    this.cipher = cipher;
  }
  _transform(chunk, encode, done) {
    let transformedChunk = '';
    if (this.cipher) {
      transformedChunk = this._caesarCipherTransform(chunk.toString(), 1);
    }
    else {
      transformedChunk = this._caesarCipherTransform(chunk.toString(), 0);
    }
    this.push(transformedChunk);
    done();
  }
  _caesarCipherTransform(str, flag) {
    return caesarCipherHandler(str, flag);
  }
}

module.exports = CaesarCipherTransphormStream;
