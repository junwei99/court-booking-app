import type { IDictionary } from "@/modules/common/types/utils.types"
import type { IEventUnitItem } from "@/modules/common/types/venue.types"
import type { EFetchStatus } from "@/others/constants/enums"

export interface IPage1SelectState {
  selectedDate: Date
  selectedCategory: number | null
}

export type TAmPm = "AM" | "PM" | ""

// export interface IDictionary<TValue> {
//   [id: string]: TValue
// }

export interface IVenueState {
  availableVenueList: Array<IEventUnitItem>
  venueFetchStatus: EFetchStatus
}

export const InitialPage2SelectState: IDictionary<string> = {
  selectedTime: "Select time",
  selectedAmPm: "AM / PM",
  selectedDuration: "Select duration",
} as const

export type TSelectKey = "time1" | "time2" | "duration"

export type TTimeAndDurationKey =
  | "selectedTime"
  | "selectedAmPm"
  | "selectedDuration"

export type TBookVenueFormData = {
  selectedDate: Date
  selectedCategory: number | null
  selectedTime: string
  selectedAmPm: TAmPm
  selectedDuration: number
}

export type TDispatchDateEventCategorySelectItemEventProps =
  | {
      type: "date"
      payload: Date
    }
  | {
      type: "event-category"
      payload: number
    }

export type TDispatchBookingTimeSelectItemEventProps =
  | {
      type: "time"
      payload: string
    }
  | {
      type: "amPm"
      payload: TAmPm
    }
  | {
      type: "duration"
      payload: number
    }

export type TDispatchSelectItemEventProps =
  | TDispatchDateEventCategorySelectItemEventProps
  | TDispatchBookingTimeSelectItemEventProps

export type TSelectItemType = TDispatchSelectItemEventProps["type"]
export type TBookingTimeSelectItemType =
  TDispatchBookingTimeSelectItemEventProps["type"]
