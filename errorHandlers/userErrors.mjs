export class MissingLoginInfoError extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingLoginInfoError";
  }
}

export class IncorrectLoginError extends Error {
    constructor (message) {
        super(message);
        this.name= "IncorrectLoginError"
    }
}

export class UserAlreadyExistsError extends Error {
    constructor (message) {
        super(message);
        this.name = "UserAlreadyExistsError"
    }
}