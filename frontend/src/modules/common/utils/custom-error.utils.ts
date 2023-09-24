export class HandledError extends Error {
  public errorCode: string

  constructor(errorCode: string, message?: string) {
    super(message)
    this.name = "HandledError"
    this.errorCode = errorCode
  }
}
