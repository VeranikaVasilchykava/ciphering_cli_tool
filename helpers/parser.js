const { ERROR_MESSAGE } = require('../constants');
const { ValidationError } = require('../custom-error');

/**
 * Set char codes
 *
 * @param {string} char
 *
 * @returns {Object}
 */
const parseChar = (char) => {
  const charCode = char.charCodeAt();
  let aCode;
  let zCode;

  if (char === char.toLowerCase()) {
    aCode = 97;
    zCode = 122;
  }
  else {
    aCode = 65;
    zCode = 90;
  }

  return { charCode, aCode, zCode };
};

/**
 * Parse process arguments
 *
 * @param {Array[string]} args
 *
 * @returns {Object}
 */
const argsParser = (args) => {
  if (args.length === 0) {
    throw new ValidationError(`${ERROR_MESSAGE.INITIAL_ARR.NAME} -> ${ERROR_MESSAGE.INITIAL_ARR.MESSAGE}`);
  }
  const configOptionIndex = args
    .findIndex(item => item === '-c' || item === '--config');
  const configStr = configOptionIndex !== -1 ? args[configOptionIndex + 1] : '';
  const inputOptionIndex = args
    .findIndex(item => item === '-i' || item === '--input');
  const inputStr = inputOptionIndex !== -1 ? args[inputOptionIndex + 1] : '';
  const outputOptionIndex = args
    .findIndex(item => item === '-o' || item === '--output');
  const outputStr = outputOptionIndex !== -1 ? args[outputOptionIndex + 1] : '';

  return {
    config: configStr,
    input: inputStr,
    output: outputStr
  };
};

module.exports = {
  parseChar,
  argsParser
};
