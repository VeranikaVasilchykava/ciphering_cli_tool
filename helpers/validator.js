const {ERROR_MESSAGE} = require('../constants');

/**
 * Check if the config is valid
 *
 * @param {string} str
 *
 * @returns {void}
 */
const validateConfig = (str) => {
  if (!str) throw Error(ERROR_MESSAGE.EMPTY_CONFIG);
  if (str.length === 1 && str !== 'A') {
    throw Error(ERROR_MESSAGE.CONFIG);
  }
  if (str.length === 2) {
    const validStr = (str === 'C0' ||
      str === 'C1' ||
      str === 'R0' ||
      str === 'R1');
    if (!validStr) throw Error(ERROR_MESSAGE.CONFIG);
  }
  if (str.indexOf('-') === 0 ||
    str.indexOf('-') === (str.length - 1)
  ) {
    throw Error(ERROR_MESSAGE.CONFIG);
  }

  if (str.length > 2) {
    if (!str.includes('-')) {
      throw Error(ERROR_MESSAGE.CONFIG);
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
      if (!validArray) throw Error(ERROR_MESSAGE.CONFIG);
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
    throw Error(ERROR_MESSAGE.INITIAL_ARR);
  }
  const optionsConfig = ['-c', '--config'];
  const optionsInput = ['-i', '--input'];
  const optionsOutput = ['-o', '--output'];
  const isValidOptionConfig = checkRequiredAndRepetitiveItems(arr, optionsConfig, true);
  const isValidOptionInput = checkRequiredAndRepetitiveItems(arr, optionsInput, false);
  const isValidOptionOutput = checkRequiredAndRepetitiveItems(arr, optionsOutput, false);
  const isValidAllOptions = isValidOptionConfig && isValidOptionInput && isValidOptionOutput;
  if (!isValidAllOptions) {
    throw Error(ERROR_MESSAGE.OPTIONS);
  }
};

module.exports = {
  validateConfig,
  validateOptions
};
