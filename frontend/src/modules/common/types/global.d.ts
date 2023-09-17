import Vue, { VNode } from "vue"

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }

  interface ISuccessRes {
    status: "success" | "error"
    message: string
  }

  //TODO: use zod validation
  // type TBaseResponse<T> = DeepPartial<{
  //   status: "success" | "error"
  //   message: string
  // }> &
  //   DeepPartial<T>

  type TBaseResponse<T> = {
    status: "success" | "error"
    message: string
  } & T
}
