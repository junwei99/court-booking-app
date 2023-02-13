import type { TSelectKey } from "../stores/book-venue-store.types"

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

export type TSelectTimeMap = Map<TSelectKey, { list: Array<ISelectTimeObj> }>

export type TCategory = {
  id: number
  name: string
  type: string
}
