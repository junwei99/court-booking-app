import { TCtrlRouteList } from "@/modules/common/types/common.types"
import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express"
import { API_STATUS_CODES } from "@/modules/common/constants/apis.constants"

const errorHandler =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch((error) => {
      next(error)
    })

export const mapRoutesInController = (
  routeList: TCtrlRouteList,
  router: Router
) =>
  routeList.map((route) => {
    const [path, method, controller] = route
    router[method](path, errorHandler(controller))
  })

export const sendSuccessRes = <TData>(
  data: TData,
  message: string,
  res: Response
) =>
  res.status(200).json({
    status: API_STATUS_CODES.SUCCESS,
    message: message ? message : "successful execution",
    ...data,
  })
