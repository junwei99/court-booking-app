import { NextFunction, Request, Response } from "express"
import { ApiError } from "@/utils/ApiError"
import { API_STATUS_CODES } from "@/modules/common/constants/apis.constants"

export const apiErrorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    res
      .status(err.code)
      .json({ status: API_STATUS_CODES.ERROR, message: err.message })
    return
  }

  res.status(500).json({
    status: API_STATUS_CODES.ERROR,
    messsage: "Oops, an unexpected error occurred",
  })
}
