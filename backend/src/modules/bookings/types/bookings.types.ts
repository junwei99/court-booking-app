export type TDuration =
  | "30 minutes"
  | "1 hour"
  | "1 hour 30 minutes"
  | "2 hours"

export interface IAmPm {
  isAvailable: boolean
  durations: Array<{ key: TDuration; value: number }>
}

export interface ITwelveHourOutputTime {
  time: string
  amOrPm: {
    am: IAmPm
    pm: IAmPm
  }
}
