const { stdout, stderr, exit } = process;
const { pipeline } = require('stream');
const { validateConfig, validateOptions } = require('./helpers/validator');
const { argsParser } = require('./helpers/parser');
const convertStringToStreamsArray = require('./helpers/converter');
const { CustomWritableStream,
        CustomReadableStream,
        customStdin } = require('./stream');
const { ValidationError } = require('./custom-error');
const { ERROR_MESSAGE } = require('./constants');

try {
  const initialArgs = process.argv.slice(2);
  const { config, input, output } = argsParser(initialArgs);

  validateOptions(initialArgs);
  validateConfig(config);

  const readableStream = input ? new CustomReadableStream(input) : customStdin();
  const writableStream = output ? new CustomWritableStream(output) : stdout;
  const transformStreamsArray = convertStringToStreamsArray(config);

  pipeline(
    readableStream,
    ...transformStreamsArray,
    writableStream,
    (err) => {
      if (err) {
        throw new ValidationError(`${ERROR_MESSAGE.PIPELINE.NAME}: -> ${err.message}`);
      }
    }
  )
}
catch(error) {
  if (error instanceof ValidationError) {
    const { message } = error;
    stderr.write(message);
    exit(1);
  }
  else {
    throw error;
  }
}
