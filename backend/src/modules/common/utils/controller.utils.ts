import { TCtrlRouteList } from "@/modules/common/types/common.types"
import { ApiError } from "@/utils/ApiError"
import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express"

const errorHandler =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch((error) => {
      let errMessage = "Oops, an unexpected error occurred"

      if (error instanceof Error && error?.message) {
        errMessage = error.message
      }

      return next(ApiError.internal(errMessage))
    })

export const mapRoutesInController = (
  routeList: TCtrlRouteList,
  router: Router
) =>
  routeList.map((route) => {
    const [path, method, controller] = route
    router[method](path, errorHandler(controller))
  })
