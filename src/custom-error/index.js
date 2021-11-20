class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class InvalidConfigError extends ValidationError {
  constructor(config) {
    super(`The config ${config} is invalid`);
    this.name = "InvalidConfigError";
    this.config = config;
  }
}

class InvalidOptionsError extends ValidationError {
  constructor(option) {
    super(`The options ${option} are invalid`);
    this.name = "InvalidOptionsError";
    this.option = option;
  }
}

module.exports = {
  ValidationError,
  InvalidConfigError,
  InvalidOptionsError
}
