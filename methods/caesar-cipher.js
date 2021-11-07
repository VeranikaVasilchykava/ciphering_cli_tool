const {parseChar} = require('../helpers/parser');

/**
 * Encode the char using Caesar cipher
 *
 * @param {string} char
 *
 * @returns {string}
 */
const caesarCipherCoding = (char) => {
  const { charCode, zCode } = parseChar(char);
  const shiftedCharCode = ((charCode + 1) <= zCode) ?
    (charCode + 1) :
    ((charCode + 1) - 26);

  return String.fromCharCode(shiftedCharCode);
};

/**
 * Decode the char using Caesar cipher
 *
 * @param {string} char
 *
 * @returns {string}
 */
const caesarCipherDecoding = (char) => {
  const { charCode, aCode } = parseChar(char);
  const shiftedCharCode = ((charCode - 1) >= aCode) ?
    (charCode - 1) :
    ((charCode - 1) + 26);

  return String.fromCharCode(shiftedCharCode);
};

/**
 * Encode/decode the string using Caesar cipher
 *
 * @param {string} str
 * @param {number} flag
 *
 * @returns {string}
 */
const caesarCipherHandler = (str, flag) => {
  if (flag === 1) {
    return str.replace(/[a-zA-Z]/g, caesarCipherCoding);
  }
  if (flag === 0) {
    return str.replace(/[a-zA-Z]/g, caesarCipherDecoding);
  }
};

module.exports = caesarCipherHandler;
