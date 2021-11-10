const ALPHABET = {
  CAPITAL: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  LOWERCASE: 'abcdefghijklmnopqrstuvwxyz'
};

const ERROR_MESSAGE = {
  INITIAL_ARR: {
    MESSAGE: 'You input empty string. Please check usage examples in read.me and try again.',
    NAME: 'EMPTY DATA'
  },
  EMPTY_CONFIG: {
    NAME: 'EMPTY CONFIG',
    MESSAGE: 'The config is empty. Please check usage examples in read.me and try again.'
  },
  CONFIG: {
    NAME: 'WRONG CONFIG',
    MESSAGE: 'You input the wrong config. Please check usage examples in read.me and try again.'
  },
  OPTIONS: {
    NAME: 'WRONG OPTIONS',
    MESSAGE: 'You are using the wrong options. Please check usage examples in read.me and try again.'
  },
  INPUT: {
    NAME: 'WRONG INPUT',
    MESSAGE: 'Unable to access the input file'
  },
  OUTPUT: {
    NAME: 'WRONG OUTPUT',
    MESSAGE: 'Unable to access the output file'
  },
  PIPELINE: {
    NAME: 'PIPELINE ERROR'
  }
};

module.exports = {
  ALPHABET,
  ERROR_MESSAGE
};
