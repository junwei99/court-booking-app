import type { EApiKeys } from "@/others/constants/api-keys.constants"
import axios from "axios"

export class Requestor {
  static ENDPOINT_DOMAIN = import.meta.env.VITE_API_ENDPOINT

  private static getUrl(apiEndpoint: string, pathString: string) {
    return `${this.ENDPOINT_DOMAIN}/${apiEndpoint}/${pathString}`
  }

  //data type will be dynamically assigned based on the passed in apiEndpoint
  static async get<TRes, TParam = undefined>(
    apiEndpoint: EApiKeys,
    params?: TParam,
    path?: string | number
  ) {
    try {
      const pathString = path ? `${path}` : ""

      const config = {
        method: "GET",
        url: this.getUrl(apiEndpoint, pathString),
        params: params,
      }

      const res = await axios<TBaseResponse<TRes>>(config)

      return res.data
    } catch (error) {
      if (error instanceof Error) {
        console.error("requestor get request error: " + error.message)
      }
      throw new Error(`error when fetching from ${apiEndpoint}`)
    }
  }

  static async post<TRes, TBody>(
    apiEndpoint: EApiKeys,
    body?: TBody,
    path?: string | number
  ) {
    try {
      const pathString = path ? `${path}` : ""

      const config = {
        method: "POST",
        url: this.getUrl(apiEndpoint, pathString),
        data: body,
      }

      const res = await axios<TRes>(config)

      return res.data
    } catch (error) {
      if (error instanceof Error) {
        console.error("requestor post request error: " + error.message)
      }
      throw new Error(`error when fetching from ${apiEndpoint}`)
    }
  }
}
