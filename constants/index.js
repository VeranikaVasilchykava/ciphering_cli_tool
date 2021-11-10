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
  PIPELINE: {
    NAME: 'PIPELINE ERROR'
  }
};

module.exports = {
  ALPHABET,
  ERROR_MESSAGE
};
