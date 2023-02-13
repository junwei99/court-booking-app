import type { IEventUnitItem } from "@/modules/common/types/venue.types"

export type TCartItem = {
  eventUnit: IEventUnitItem
  bookingDatetime: Date
  duration: number
}
