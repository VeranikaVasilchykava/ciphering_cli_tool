const fs = require("fs");
const {stdout, stderr, exit } = process;
const {validateConfig, validateOptions} = require('./helpers/validator');
const {argsParser} = require('./helpers/parser');
const CipherTransphorm = require('./stream/cipherTransphorm');
const customStdin = require('./stream/customStdin');
const {ERROR_MESSAGE} = require('./constants');

try {
  const initialArgs = process.argv.slice(2);
  const {config, input, output} = argsParser(initialArgs);

  validateOptions(initialArgs);
  validateConfig(config);

  const readableStream = input ? fs.createReadStream(`${input}`) : customStdin();
  const writableStream = output ? fs.createWriteStream(`${output}`) : stdout;
  const transformStream = new CipherTransphorm(config);
  const handleReadError = () => {
    readableStream.destroy();
    stderr.write(ERROR_MESSAGE.INPUT);
    exit(1);
  };
  const handleWriteError = () => {
    writableStream.destroy();
    stderr.write(ERROR_MESSAGE.OUTPUT);
    exit(1);
  };

  readableStream
    .on('error', handleReadError)
    .pipe(transformStream)
    .pipe(writableStream)
    .on('error', handleWriteError);
}
catch(error) {
  stderr.write(error.message);
  exit(1);
}
