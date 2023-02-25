import { Response } from "express"
import { API_STATUS_CODES } from "@/modules/common/constants/apis.constants"

export class ApiRes {
  private res: Response
  private static DEFAULT_ERR_MESSAGE = "Oops, an unexpected error occurred"

  constructor(res: Response) {
    this.res = res
  }

  public sendSuccessRes<TData>(data: TData, message?: string) {
    return this.res.status(200).json({
      status: API_STATUS_CODES.SUCCESS,
      message: message ? message : "successful execution",
      ...data,
    })
  }

  public sendHandledErrorRes(message: string) {
    return this.res.status(400).json({
      status: API_STATUS_CODES.ERROR,
      message: message ? message : ApiRes.DEFAULT_ERR_MESSAGE,
    })
  }

  public sendExceptionErrorRes(message?: string) {
    return this.res.status(500).json({
      status: API_STATUS_CODES.ERROR,
      message: message ? message : ApiRes.DEFAULT_ERR_MESSAGE,
    })
  }
}
