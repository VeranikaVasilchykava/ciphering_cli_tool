const {helperToCipher} = require('../helpers');

const caesarCipherCoding = (char) => {
  const { charCode, aCode, zCode } = helperToCipher(char);
  const shiftedCharCode = ((charCode + 1) <= zCode) ?
    (charCode + 1) :
    ((charCode + 1) % zCode + (aCode - 1));

  return String.fromCharCode(shiftedCharCode);
};

const caesarCipherDecoding = (char) => {
  const { charCode, aCode, zCode } = helperToCipher(char);
  const shiftedCharCode = ((charCode - 1) <= zCode) ?
    (charCode - 1) :
    ((charCode - 1) % zCode + (aCode + 1));

  return String.fromCharCode(shiftedCharCode);
};

const caesarCipherHandler = (str, flag) => {
  if (flag === 1) {
    return str.replace(/[a-zA-Z]/g, caesarCipherCoding);
  }
  if (flag === 0) {
    return str.replace(/[a-zA-Z]/g, caesarCipherDecoding);
  }
};

module.exports = caesarCipherHandler;
