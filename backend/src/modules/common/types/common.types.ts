import { ROUTES } from "@/modules/common/constants/routes.constants"
import { RequestHandler } from "express"
import { API_STATUS_CODES } from "@/modules/common/constants/apis.constants"

export interface TReqBody<T> extends Express.Request {
  body: T
}

export interface TReqQuery<T> extends Express.Request {
  query: T
}

export type TRoute = typeof ROUTES[keyof typeof ROUTES]

export type TReqMethod = "get" | "post" | "put" | "delete"

export type TCtrlRouteList = Array<[TRoute, TReqMethod, RequestHandler]>

export type TApiStatusCode =
  typeof API_STATUS_CODES[keyof typeof API_STATUS_CODES]
