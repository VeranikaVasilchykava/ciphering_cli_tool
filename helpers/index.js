const helperToCipher = (char) => {
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

const isValidConfig = (str) => {
  if (!str) return false;
  if (str.length === 1 && str !== 'A') {
    return false;
  }
  if (str.length === 2) {
    const validStr = (str === 'C0' ||
      str === 'C1' ||
      str === 'R0' ||
      str === 'R1');
    if (!validStr) return false;
  }
  if (str.indexOf('-') === 0 ||
    str.indexOf('-') === (str.length - 1)
  ) {
    return false;
  }

  if (str.length > 2) {
    if (!str.includes('-')) {
      return false;
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
      if (!validArray) return false;
    }
  }
  return true;
};

const checkExistingAndRepetitiveItems = (arr, [abbrv, complete]) => {
  const arrayOfItems = arr.reduce((acc, item) => {
    if (item.includes(abbrv)) {
      acc.push(abbrv);
    }
    if (item.includes(complete)) {
      acc.push(complete);
    }
    return acc;
  }, []);
  return arrayOfItems.length === 1;
};

const isValidOptions = (arr) => {
  const optionsConfig = ['-c', '--config'];
  const optionsInput = ['-i', '--input'];
  const optionsOutput = ['-o', '--output'];
  const isValidOptionConfig = checkExistingAndRepetitiveItems(arr, optionsConfig);
  const isValidOptionInput = checkExistingAndRepetitiveItems(arr, optionsInput);
  const isValidOptionOutput = checkExistingAndRepetitiveItems(arr, optionsOutput);
  const isValidAllOptions = isValidOptionConfig && isValidOptionInput && isValidOptionOutput;
  return isValidAllOptions;
};

module.exports = {
  helperToCipher,
  isValidConfig,
  isValidOptions
};
