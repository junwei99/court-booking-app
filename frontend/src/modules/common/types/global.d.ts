import type { DeepPartial } from "@/modules/common/types/utils.types"
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

  type TBaseResponse<T> = DeepPartial<{
    status: "success" | "error"
    message: string
  }> &
    DeepPartial<T>
}
