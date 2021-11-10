const { Transform } = require('stream');
const rot8CipherHandler = require('../methods/rot-8-cipher');

class Rot8CipherTransphormStream extends Transform {
  constructor(cipher) {
    super();
    this.cipher = cipher;
  }
  _transform(chunk, encode, done) {
    switch(this.cipher) {
      case 'R0':
        transformedChunk = this._rot8CipherTransphorm(transformedChunk, 0);
        break;
      case 'R1':
        transformedChunk = this._rot8CipherTransphorm(transformedChunk, 1);
        break;
      default:
        break;
    }
    this.push(transformedChunk);
    done();
  }
  _rot8CipherTransphorm(str, flag) {
    return rot8CipherHandler(str, flag);
  }
}

module.exports = Rot8CipherTransphormStream;
