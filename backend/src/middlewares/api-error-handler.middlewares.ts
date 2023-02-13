import express from "express"
import { ApiError } from "@/utils/ApiError"

export const apiErrorHandler = (
  err: ApiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.error(err)

  if (err instanceof ApiError) {
    res.status(err.code).json(err.message)
    return
  }

  res.status(500).json("something went wrong")
}
