import { ROUTES } from "@/modules/common/constants/routes.constants"
import { RequestHandler } from "express"
import { API_STATUS_CODES } from "@/modules/common/constants/apis.constants"

export type TRoute = typeof ROUTES[keyof typeof ROUTES]

export type TReqMethod = "get" | "post" | "put" | "delete"

export type TCtrlRouteList = Array<[TRoute, TReqMethod, RequestHandler]>

export type TApiStatusCode =
  typeof API_STATUS_CODES[keyof typeof API_STATUS_CODES]
