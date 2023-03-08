import { ApiRes } from "@/modules/common/utils/ApiResponse.utils"
import { HandledError } from "@/modules/common/utils/HandledError.utils"
import { NextFunction, Request, Response } from "express"

export const apiErrorHandler = (
  err: HandledError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err.message)

  const apiRes = new ApiRes(res)

  if (err instanceof HandledError) {
    return apiRes.sendHandledErrorRes(err.message)
  }

  return apiRes.sendExceptionErrorRes()
}
