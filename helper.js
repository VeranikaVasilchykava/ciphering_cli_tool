const helperCoding = (char) => {
  const charCode = char.charCodeAt();
  let aCode;
  let zCode;

  if (char === char.toLowerCase()) {
    aCode = 97;
    zCode = 122;
  }
  else {
    aCode = 65;
    zCode = 90;
  }

  return { charCode, aCode, zCode };
}

module.exports = helperCoding;
