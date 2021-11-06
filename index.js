
const fs = require("fs");
const { Writable, Readable } = require('stream');
const {isValidConfig, isValidOptions} = require('./helpers');
const {ERROR_MESSAGE} = require('./constants');
const CipherTransphorm = require('./stream/cipherTransphorm');

const {stdin, stdout, stderr, exit } = process;
const initialArgs = process.argv.slice(2);

if (initialArgs.length < 4 || initialArgs.length > 6) {
  stderr.write(ERROR_MESSAGE.INITIAL_ARR);
  exit(1);
}

if (!isValidOptions(initialArgs)) {
  stderr.write(ERROR_MESSAGE.OPTIONS);
  exit(1);
}

const configOptionIndex = initialArgs
  .findIndex(item => item === '-c' || item === '--config');
const cipherStr = initialArgs[configOptionIndex + 1];

if (!isValidConfig(cipherStr)) {
  stderr.write(ERROR_MESSAGE.CONFIG);
  exit(1);
}

const inputOptionIndex = initialArgs
  .findIndex(item => item === '-i' || item === '--input');
const inputStr = initialArgs[inputOptionIndex + 1];
const outputOptionIndex = initialArgs
  .findIndex(item => item === '-o' || item === '--output');
const outputStr = initialArgs[outputOptionIndex + 1];

if (inputStr && outputStr) {
  if (!fs.existsSync(`./${inputStr}`)) {
    stderr.write(ERROR_MESSAGE.INPUT);
    exit(1);
  }
  if (!fs.existsSync(`./${outputStr}`)) {
    stderr.write(ERROR_MESSAGE.OUTPUT);
    exit(1);
  }
  const readableStream = fs.createReadStream(`./${inputStr}`);
  const writableStream = fs.createWriteStream(`./${outputStr}`);

  readableStream
    .pipe(new CipherTransphorm(cipherStr))
    .pipe(writableStream);
}
else {
  if (!inputStr && outputStr) {
    const writableStream = fs.createWriteStream(`./${outputStr}`);
    stdin
      .pipe(new CipherTransphorm(cipherStr))
      .pipe(writableStream);
  }
  if (!outputStr && inputStr) {
    const readableStream = fs.createReadStream(`./${inputStr}`);
    readableStream
      .pipe(new CipherTransphorm(cipherStr))
      .pipe(stdout);
  }
  if (!outputStr && !inputStr) {
    stdin
      .pipe(new CipherTransphorm(cipherStr))
      .pipe(stdout);
  }
}
