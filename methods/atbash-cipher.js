const {ALPHABET} = require('../constants');

/**
 * Encode/decode the char using Atbash cipher
 *
 * @param {string} char
 *
 * @returns {string}
 */
const atbashCipherCoding = (char) => {
  if (char === char.toLowerCase()) {
    const charIndex = ALPHABET.LOWERCASE.indexOf(char) + 1;
    const newCharIndex = ALPHABET.LOWERCASE.length - charIndex + 1;
    return ALPHABET.LOWERCASE.charAt(newCharIndex - 1);
  }
  else {
    const charIndex = ALPHABET.CAPITAL.indexOf(char) + 1;
    const newCharIndex = ALPHABET.CAPITAL.length - charIndex + 1;
    return ALPHABET.CAPITAL.charAt(newCharIndex - 1);
  }
};

/**
 * Encode/decode the string using Atbash cipher
 *
 * @param {string} str
 *
 * @returns {string}
 */
const atbashCipherHandler = (str) => {
  return str.replace(/[a-zA-Z]/g, atbashCipherCoding);
};

module.exports = atbashCipherHandler;
