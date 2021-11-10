const { Transform } = require('stream');
const caesarCipherHandler = require('../methods/caesar-cipher');

class CaesarCipherTransphormStream extends Transform {
  constructor(cipher) {
    super();
    this.cipher = cipher;
  }
  _transform(chunk, encode, done) {
    switch(this.cipher) {
      case 'C0':
        transformedChunk = this._caesarCipherTransform(transformedChunk, 0);
        break;
      case 'C1':
        transformedChunk = this._caesarCipherTransform(transformedChunk, 1);
        break;
      default:
        break;
    }
    this.push(transformedChunk);
    done();
  }
  _caesarCipherTransform(str, flag) {
    return caesarCipherHandler(str, flag);
  }
}

module.exports = CaesarCipherTransphormStream;
