const helperCoding = require('./helper');

const rot8CipherCoding = (char) => {
  const { charCode, zCode } = helperCoding(char);
  const shiftedCharCode = ((charCode + 8) <= zCode) ?
    (charCode + 8) :
    ((charCode + 8) - 26);

  return String.fromCharCode(shiftedCharCode);
};

const rot8CipherDecoding = (char) => {
  const { charCode, aCode } = helperCoding(char);
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
