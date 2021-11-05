const ALPHABET = require('./constants');

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

const atbashCipherHandler = (str) => {
  return str.replace(/[a-zA-Z]/g, atbashCipherCoding);
};

module.exports = atbashCipherHandler;
