class ApplicationError extends Error {
  constructor(message) {
    super(message);
    // name is set to the name of the class
    this.name = this.constructor.name;
    this.status = this.constructor.status;
  }
}

module.exports = ApplicationError;
