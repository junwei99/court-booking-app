import { IQueryBookingsResult } from "@/modules/bookings/queries/query-bookings/query-bookings.queries"
import { ITwelveHourOutputTime } from "@/modules/bookings/types/bookings.types"
import dayjs from "dayjs"

export const getIntervalDateList = (
  startDateTime: Date,
  intervalMinutes: number,
  endDateTime?: Date
) => {
  const startDt = dayjs(startDateTime)
  const endDt = endDateTime
    ? dayjs(endDateTime)
    : dayjs(startDateTime).endOf("day")

  let dtInLoop = startDt
  const datetimeIntervalList: Array<Date> = []

  while (dtInLoop.isBefore(endDt)) {
    const datetimeToBeAdded = dtInLoop.add(intervalMinutes, "minute")
    datetimeIntervalList.push(datetimeToBeAdded.toDate())
    dtInLoop = datetimeToBeAdded
  }

  return datetimeIntervalList
}

export const getFilteredIntervalDateList = (
  intervalDateList: Array<Date>,
  bookings: Array<IQueryBookingsResult>
) => {
  let filteredIntervalDateList: Array<Date> = intervalDateList

  if (bookings && bookings.length > 0) {
    filteredIntervalDateList = intervalDateList.filter(
      (date) =>
        !bookings.every(
          (booking) =>
            dayjs(date).isSame(dayjs(booking.booking_start_date)) ||
            dayjs(date).isBetween(
              dayjs(booking.booking_start_date),
              dayjs(booking.booking_end_date),
              "minute"
            )
        )
    )
  }

  return filteredIntervalDateList
}

export const getTransformedTimeslots = (
  bookableIntervalDateList: Array<Date>,
  intervalDateList: Array<Date>,
  intervalMin: number
) => {
  const intervalDateStrList = intervalDateList.map((date) =>
    dayjs(date).format("h:mm A")
  )

  const twelveHourTimeWithoutAMPMList = new Set(
    [...intervalDateStrList].map((d) => d.split(" ")[0])
  )

  const bookableTimeslotAmount = 4

  const twelveHourOutputTimeMap = new Map<string, ITwelveHourOutputTime>(
    [...twelveHourTimeWithoutAMPMList].map((time) => [
      time,
      {
        time: time,
        amOrPm: {
          am: {
            isAvailable: false,
            durations: [],
          },
          pm: {
            isAvailable: false,
            durations: [],
          },
        },
      },
    ])
  )

  //loop bookable times, every loop add available durations
  bookableIntervalDateList.forEach((datetime, index) => {
    const dayjsDt = dayjs(datetime)
    const splitTime = dayjsDt.format("h:mm A").split(" ")
    const currentTimeObj = twelveHourOutputTimeMap.get(splitTime[0])

    //return early if currentTimeObj is undefined
    if (!currentTimeObj) return

    const amPmKey = splitTime[1] === "AM" ? "am" : "pm"
    currentTimeObj.amOrPm[amPmKey] = {
      isAvailable: true,
      durations: [
        { key: "30 minutes", value: 30 },
        { key: "1 hour", value: 60 },
        { key: "1 hour 30 minutes", value: 90 },
        { key: "2 hours", value: 120 },
      ],
    }

    if (index !== bookableIntervalDateList.length - 1) {
      const minutesDifference = dayjs(bookableIntervalDateList[index + 1]).diff(
        dayjsDt,
        "minute"
      )

      if (minutesDifference > intervalMin) {
        const indexToMutate = [...twelveHourOutputTimeMap].findIndex(
          (obj) => obj[1].time === splitTime[0]
        )

        //mutate the current index and 3 items above in the twelveHourOutputTimeMap
        for (let i = 0; i < bookableTimeslotAmount; i++) {
          ;[...twelveHourOutputTimeMap][indexToMutate - i][1].amOrPm[
            amPmKey
          ].durations.splice(1 + i, 3 - i)
        }
      }

      twelveHourOutputTimeMap.set(splitTime[0], currentTimeObj)
    }
  })

  return [...twelveHourOutputTimeMap].map((time) => time[1])
}
