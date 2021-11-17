const { parseChar } = require('../helpers/parser');

/**
 * Encode the char using Rot-8 cipher
 *
 * @param {string} char
 *
 * @returns {string}
 */
const rot8CipherCoding = (char) => {
  const { charCode, zCode } = parseChar(char);
  const shiftedCharCode = ((charCode + 8) <= zCode) ?
    (charCode + 8) :
    ((charCode + 8) - 26);

  return String.fromCharCode(shiftedCharCode);
};

/**
 * Decode the char using Rot-8 cipher
 *
 * @param {string} char
 *
 * @returns {string}
 */
const rot8CipherDecoding = (char) => {
  const { charCode, aCode } = parseChar(char);
  const shiftedCharCode = ((charCode - 8) >= aCode) ?
    (charCode - 8) :
    ((charCode - 8) + 26);

  return String.fromCharCode(shiftedCharCode);
};

/**
 * Encode/decode the string using Rot-8 cipher
 *
 * @param {string} char
 * @param {number} flag
 *
 * @returns {string}
 */
const rot8CipherHandler = (str, flag) => {
  if (flag === 1) {
    return str.replace(/[a-zA-Z]/g, rot8CipherCoding);
  }
  if (flag === 0) {
    return str.replace(/[a-zA-Z]/g, rot8CipherDecoding);
  }
};

module.exports = rot8CipherHandler;
