import type { TTimeAndDurationKey } from "@/modules/book-venue/types/stores/book-venue-store.types"

// export type TSelectTimeMap = Map<
//   TSelectKey,
//   { list: Array<{ text: string; disabled?: boolean }> }
// >
export interface ISelectTimeObj {
  text: string
  //value is used for duration (minutes)
  value: string
  disabled?: boolean
}

export type TSelectTimeMap = Map<
  TTimeAndDurationKey,
  { list: Array<ISelectTimeObj> }
>

export type TCategory = {
  id: number
  name: string
  type: string
}
