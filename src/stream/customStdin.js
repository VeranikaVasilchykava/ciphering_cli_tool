const customStdin = () => {
  const {stdout, stdin} = process;
  stdout.write(`Please, enter the string to encode/decode.\n`);
  stdout.write(`To cancel you can press Ctrl+C.\n`);
  stdin.resume();
  return stdin;
};

module.exports = customStdin;
