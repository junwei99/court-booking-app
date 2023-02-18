import { ROUTES } from "@/constants/routes.constants"
import { RequestHandler } from "express"

export interface TReqBody<T> extends Express.Request {
  body: T
}

export interface TReqQuery<T> extends Express.Request {
  query: T
}

export type TRoute = typeof ROUTES[keyof typeof ROUTES] & string

export type TReqMethod = "get" | "post" | "put" | "delete"

export type TCtrlRouteList = Array<[TRoute, TReqMethod, RequestHandler]>
