const { ERROR_MESSAGE } = require('../constants');
const ValidationError = require('../custom-error');
const { AtbashCipherTransphormStream,
  CaesarCipherTransphormStream,
  Rot8CipherTransphormStream
} = require('../stream');

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
    throw new ValidationError(ERROR_MESSAGE.INITIAL_ARR.MESSAGE, ERROR_MESSAGE.INITIAL_ARR.NAME);
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

/**
 * Parse process arguments
 *
 * @param {string} config
 *
 * @returns {Array[any]}
 */
const convertStringToStreamsArray = (config) => {
  return config
    .split('-')
    .map(item => {
      switch(item) {
        case 'A':
          item = new AtbashCipherTransphormStream();
          break;
        case 'C0':
          item = new CaesarCipherTransphormStream(0);
          break;
        case 'C1':
          item = new CaesarCipherTransphormStream(1);
          break;
        case 'R0':
          item = new Rot8CipherTransphormStream(0);
          break;
        case 'R1':
          item = new Rot8CipherTransphormStream(1);
          break;
      }
      return item;
    });
}

module.exports = {
  parseChar,
  argsParser,
  convertStringToStreamsArray
};
