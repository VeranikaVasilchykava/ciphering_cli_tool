const {helperToCipher} = require('../helpers');

const rot8CipherCoding = (char) => {
  const { charCode, zCode } = helperToCipher(char);
  const shiftedCharCode = ((charCode + 8) <= zCode) ?
    (charCode + 8) :
    ((charCode + 8) - 26);

  return String.fromCharCode(shiftedCharCode);
};

const rot8CipherDecoding = (char) => {
  const { charCode, aCode } = helperToCipher(char);
  const shiftedCharCode = ((charCode - 8) >= aCode) ?
    (charCode - 8) :
    ((charCode - 8) + 26);

  return String.fromCharCode(shiftedCharCode);
};

const rot8CipherHandler = (str, flag) => {
  if (flag === 1) {
    return str.replace(/[a-zA-Z]/g, rot8CipherCoding);
  }
  if (flag === 0) {
    return str.replace(/[a-zA-Z]/g, rot8CipherDecoding);
  }
};

module.exports = rot8CipherHandler;
