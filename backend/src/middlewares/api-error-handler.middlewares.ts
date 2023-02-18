import express from "express"
import { ApiError } from "@/utils/ApiError"

export const apiErrorHandler = (
  err: ApiError | Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  if (err instanceof ApiError) {
    res.status(err.code).json({ message: err.message })
    return
  }

  res.status(500).json("Oops, an unexpected error occurred")
}
