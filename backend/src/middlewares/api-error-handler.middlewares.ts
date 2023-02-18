import { NextFunction, Request, Response } from "express"
import { ApiError } from "@/utils/ApiError"

export const apiErrorHandler = (
  err: ApiError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    res.status(err.code).json({ message: err.message })
    return
  }

  res.status(500).json("Oops, an unexpected error occurred")
}
