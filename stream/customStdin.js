const customStdin = () => {
  const {stdout, stdin} = process;
  stdout.write(`Please, enter the string to encode/decode and press 'Enter'.\n`);
  stdin.resume();
  return stdin;
};

module.exports = customStdin;
