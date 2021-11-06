const { Transform } = require('stream');
const caesarCipherHandler = require('../methods/caesar-cipher');
const rot8CipherHandler = require('../methods/rot-8-cipher');
const atbashCipherHandler = require('../methods/atbash-cipher');

class CipherTransphorm extends Transform {
  constructor(order) {
    super();
    this.order = order;
  }
  _transform(chunk, encode, done) {
    if (!this.order.includes('-')) {
      if (this.order.length === 1) {
        const transformedChunk = this._atbashCipherTransphorm(chunk.toString());
        this.push(transformedChunk);
        done();
      }
    }
    else {
      const arr = this.order.split('-');
      let transformedChunk = chunk.toString();
      arr.forEach(item => {
        switch(item) {
          case 'A':
            transformedChunk = this._atbashCipherTransphorm(transformedChunk);
            break;
          case 'C0':
            transformedChunk = this._caesarCipherTransform(transformedChunk, 0);
            break;
          case 'C1':
            transformedChunk = this._caesarCipherTransform(transformedChunk, 1);
            break;
          case 'R0':
            transformedChunk = this._rot8CipherTransphorm(transformedChunk, 0);
            break;
          case 'R1':
            transformedChunk = this._rot8CipherTransphorm(transformedChunk, 1);
            break;
          default:
            break;
        }
      });
      this.push(transformedChunk);
    }
    done();
  }
  _caesarCipherTransform(str, flag) {
    return caesarCipherHandler(str, flag);
  }
  _rot8CipherTransphorm(str, flag) {
    return rot8CipherHandler(str, flag);
  }
  _atbashCipherTransphorm(str) {
    return atbashCipherHandler(str);
  }
}

module.exports = CipherTransphorm;
