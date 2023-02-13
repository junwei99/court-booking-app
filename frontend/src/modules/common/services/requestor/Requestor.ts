import type { EApiKeys } from "@/others/constants/api-keys.constants"
import axios from "axios"

export class Requestor {
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
        url: `${
          import.meta.env.VITE_API_ENDPOINT
        }/${apiEndpoint}/${pathString}`,
        params: params,
      }

      const res = await axios<TRes>(config)

      return res.data
    } catch (error) {
      if (error instanceof Error) {
        console.error("requestor get request error: " + error.message)
      }
      throw new Error(`error when fetching from ${apiEndpoint}`)
    }
  }
}
