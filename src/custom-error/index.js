class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class InvalidConfigError extends ValidationError {
  constructor(config) {
    super(`Invalid config: ${config}`);
    this.name = "InvalidConfigError";
    this.config = config;
  }
}

class InvalidOptionsError extends ValidationError {
  constructor(option) {
    super(`Invalid options: ${option}`);
    this.name = "InvalidOptionsError";
    this.option = option;
  }
}

module.exports = {
  ValidationError,
  InvalidConfigError,
  InvalidOptionsError
}
