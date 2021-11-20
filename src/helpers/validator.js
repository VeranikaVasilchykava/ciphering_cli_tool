const { ERROR_MESSAGE } = require('../constants');
const {
  ValidationError,
  InvalidConfigError,
  InvalidOptionsError
} = require('../custom-error');

/**
 * Check if the config is valid
 *
 * @param {string} str
 *
 * @returns {void}
 */
const validateConfig = (str) => {
  if (!str) {
    throw new ValidationError(`${ERROR_MESSAGE.EMPTY_CONFIG.NAME} -> ${ERROR_MESSAGE.EMPTY_CONFIG.MESSAGE}`);
  }
  if (str.length === 1 && str !== 'A') {
    throw new InvalidConfigError(`should contain A instead of ${str}`);
  }
  if (str.length === 2) {
    const validStr = (str === 'C0' ||
      str === 'C1' ||
      str === 'R0' ||
      str === 'R1');
    if (!validStr) {
      throw new InvalidConfigError(`should contain some of C0, C1, R0, R1 instead of ${str}`);
    }
  }
  if (str.indexOf('-') === 0 ||
    str.indexOf('-') === (str.length - 1)
  ) {
    throw new InvalidConfigError('should not start or end with hyphen');
  }

  if (str.length > 2) {
    if (!str.includes('-')) {
      throw new InvalidConfigError(`doesn't contain hyphen`);
    }
    else {
      const arrayFromString = str.split('-');
      const validArray = arrayFromString.reduce((result, item) => {
        if (!item) result = false;
        if (item.length > 2) {
          result = false;
        }
        if (item.length === 1 && item !== 'A') result = false;
        if (item.length === 2) {
          const validStr = (item === 'C0' ||
            item === 'C1' ||
            item === 'R0' ||
            item === 'R1');
          if (!validStr) {
            result = false;
          }
        }
        return result;
      }, true);
      if (!validArray) {
        throw new InvalidConfigError(`should contain some of C0, C1, R0, R1, A instead of ${str}`);
      }
    }
  }
};

/**
 * Check if items are required or repetitive
 *
 * @param {Array[string]} arr
 * @param {Array[string]} arrOpts
 * @param {boolean} isRequired
 *
 * @returns {boolean}
 */
const checkRequiredAndRepetitiveItems = (arr, [abbrv, complete], isRequired) => {
  const arrayOfItems = arr.reduce((acc, item) => {
    if (item === abbrv) {
      acc.push(abbrv);
    }
    if (item === complete) {
      acc.push(complete);
    }
    return acc;
  }, []);
  if (isRequired) {
    return arrayOfItems.length === 1;
  }
  else {
    return arrayOfItems.length <= 1;
  }
};

/**
 * Check if the options are valid
 *
 * @param {Array[string]} arr
 *
 * @returns {void}
 */
const validateOptions = (arr) => {
  if (arr.length === 0) {
    throw new ValidationError(`${ERROR_MESSAGE.INITIAL_ARR.NAME}: -> ${ERROR_MESSAGE.INITIAL_ARR.MESSAGE}`);
  }
  const optionsConfig = ['-c', '--config'];
  const optionsInput = ['-i', '--input'];
  const optionsOutput = ['-o', '--output'];
  const isValidOptionConfig = checkRequiredAndRepetitiveItems(arr, optionsConfig, true);
  const isValidOptionInput = checkRequiredAndRepetitiveItems(arr, optionsInput, false);
  const isValidOptionOutput = checkRequiredAndRepetitiveItems(arr, optionsOutput, false);

  if (!isValidOptionConfig) {
    throw new InvalidOptionsError(`use -c or --config, they are required but shouldn't be repeated`);
  }
  if (!isValidOptionInput) {
    throw new InvalidOptionsError(`use -i or --input and don't repeat them`);
  }
  if (!isValidOptionOutput) {
    throw new InvalidOptionsError(`use -o or --output and don't repeat them`);
  }
};

module.exports = {
  validateConfig,
  validateOptions,
  checkRequiredAndRepetitiveItems
};
