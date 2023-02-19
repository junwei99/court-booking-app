import { NextFunction, Request, Response } from "express"
import { ApiRes } from "@/modules/common/utils/ApiResponse.utils"
import { HandledError } from "@/modules/common/utils/HandledError.utils"

export const apiErrorHandler = (
  err: HandledError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const apiRes = new ApiRes(res)

  if (err instanceof HandledError) {
    return apiRes.sendHandledErrorRes(err.message)
  }

  return apiRes.sendExceptionErrorRes()
}
