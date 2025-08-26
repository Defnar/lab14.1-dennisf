export class MissingLoginInfoError extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingLoginInfoError";
  }
}

export class MissingUserError extends Error {
    constructor (message) {
        super(message);
        this.name= "MissingUserError"
    }
}