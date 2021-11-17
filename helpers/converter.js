const { AtbashCipherTransphormStream,
  CaesarCipherTransphormStream,
  Rot8CipherTransphormStream
} = require('../stream');

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
          item = new CaesarCipherTransphormStream(false);
          break;
        case 'C1':
          item = new CaesarCipherTransphormStream(true);
          break;
        case 'R0':
          item = new Rot8CipherTransphormStream(false);
          break;
        case 'R1':
          item = new Rot8CipherTransphormStream(true);
          break;
      }
      return item;
    });
}

module.exports = convertStringToStreamsArray;
