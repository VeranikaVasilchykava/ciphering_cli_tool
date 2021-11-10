const { stdout, stderr, exit } = process;
const { validateConfig, validateOptions } = require('./helpers/validator');
const { argsParser } = require('./helpers/parser');
const { AtbashCipherTransphormStream,
        CaesarCipherTransphormStream,
        Rot8CipherTransphormStream,
        CustomWritableStream,
        CustomReadableStream,
        customStdin } = require('./stream');

try {
  const initialArgs = process.argv.slice(2);
  const {config, input, output} = argsParser(initialArgs);

  validateOptions(initialArgs);
  validateConfig(config);

  const readableStream = input ? new CustomReadableStream(input) : customStdin();
  const writableStream = output ? new CustomWritableStream(output) : stdout;
  const transformStream = new CipherTransphorm(config);

  readableStream
    .pipe(transformStream)
    .pipe(writableStream);
}
catch(error) {
  stderr.write(error.message);
  exit(1);
}
