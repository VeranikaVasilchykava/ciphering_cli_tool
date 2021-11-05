const caesarCipherHandler = require('./caesar-cipher');
const rot8CipherHandler = require('./rot-8-cipher');
const atbashCipherHandler = require('./atbash-cipher');

// C1-C1-R0-A
const str = 'This is secret. Message about "_" symbol!';

console.log(atbashCipherHandler(rot8CipherHandler(caesarCipherHandler(caesarCipherHandler(str, 1), 1), 0)));
