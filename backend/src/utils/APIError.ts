export class ApiError {
  code: number
  message: string

  static DEFAULT_MESSAGE = "Oops, an unexpected error occured"

  constructor(code: number, message: string) {
    this.code = code
    this.message = message
  }

  static badRequest(msg: string = this.DEFAULT_MESSAGE) {
    return new ApiError(400, msg)
  }

  static internal(msg: string = this.DEFAULT_MESSAGE) {
    return new ApiError(500, msg)
  }
}
