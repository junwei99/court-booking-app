import { ref, computed } from "vue"
import type { IEventUnitItem } from "@/modules/common/types/venue.types"
import type { TCartItem } from "@/modules/book-venue/types/components/cart.types"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import { defineStore } from "pinia"
import {
  getIsTimeslotInCart,
  getSortedCartDisplayList,
} from "@/modules/book-venue/services/business/validate-timeslot.business"

type TCartItemMap = Map<number, Array<TCartItem>>

dayjs.extend(isBetween)

//TODO: revisit logic for unique eventUnits based on booking duration and time

export const useCartStore = defineStore("cart", () => {
  const venueToBook = ref({ id: "", name: "" })
  const cartItemMap = ref<TCartItemMap>(new Map())

  //getters
  const mergedEventUnitsList = computed(() =>
    [...cartItemMap.value.values()].flat()
  )

  const bookingTotalPriceInfo = computed(() =>
    mergedEventUnitsList.value.reduce(
      (acc, eventUnit) => acc + eventUnit.eventUnit.price,
      0
    )
  )

  const cartSize = computed(() => mergedEventUnitsList.value.length)

  const cartItemsDisplayList = computed(() =>
    [...cartItemMap.value].map(([timestamp, cartItems]) => {
      const displayDate = dayjs(timestamp).format("D MMM YYYY dddd")

      const mappedCartItems = cartItems.map((cartItem) => {
        const dayjsTime = dayjs(cartItem.bookingDatetime)

        const bookingStartTime = dayjsTime.format("h:mmA")
        const bookingEndTime = dayjsTime
          .add(cartItem.duration, "minute")
          .format("h:mmA")

        const { eventUnitId, venueName, price } = cartItem.eventUnit

        return {
          id: eventUnitId + timestamp + "d" + cartItem.duration,
          eventUnitName: venueName,
          bookingTimeFrame: `${bookingStartTime} - ${bookingEndTime}`,
          bookingStartTime: dayjsTime,
          bookingEndTime: dayjsTime.add(cartItem.duration, "minute"),
          price: price,
        }
      })

      const outputEventUnitList = getSortedCartDisplayList(mappedCartItems)

      return {
        bookingDate: displayDate,
        eventUnitList: outputEventUnitList,
      }
    })
  )

  const getTimestampKey = (bookingDatetime: Date) => {
    return dayjs(bookingDatetime).startOf("day").valueOf()
  }

  const deleteItemFromCart = (eventUnitId: number, bookingDateTime: Date) => {
    const timestamp = getTimestampKey(bookingDateTime)

    if (cartItemMap.value.has(timestamp)) {
      const newCartList = cartItemMap.value
        .get(timestamp)!
        ?.filter((cartItem) => cartItem.eventUnit.eventUnitId !== eventUnitId)

      cartItemMap.value.set(timestamp, newCartList)
    }
  }

  const hasItem = (
    eventUnitId: number,
    bookingDuration: number,
    bookingDateTime?: Date
  ) => {
    if (!bookingDateTime) {
      return mergedEventUnitsList.value.some(
        (cartItem) =>
          cartItem.eventUnit.eventUnitId === eventUnitId &&
          cartItem.duration === bookingDuration
      )
    }

    const timestamp = getTimestampKey(bookingDateTime)

    if (cartItemMap.value.has(timestamp)) {
      const eventUnitItemList = cartItemMap.value.get(timestamp)!

      return getIsTimeslotInCart(
        eventUnitItemList,
        eventUnitId,
        bookingDateTime,
        bookingDuration
      )
    } else {
      return false
    }
  }

  const handleMutateCartItems = (
    eventUnit: IEventUnitItem,
    duration: number,
    bookingDatetime: Date,
    venueId: string
  ) => {
    // const timestamp = bookingDateTime.getTime()
    const timestamp = getTimestampKey(bookingDatetime)

    //resets state if the venueId is different
    if (venueToBook.value.id !== venueId) {
      venueToBook.value = {
        id: venueId,
        name: "",
      }
      cartItemMap.value = new Map()
    }

    const hasItemVal = hasItem(eventUnit.eventUnitId, duration, bookingDatetime)

    if (!cartItemMap.value.has(timestamp)) {
      cartItemMap.value.set(timestamp, [
        {
          eventUnit,
          bookingDatetime,
          duration,
        },
      ])
    } else if (hasItemVal) {
      deleteItemFromCart(eventUnit.eventUnitId, bookingDatetime)
    } else if (!hasItemVal) {
      const newVenues = [
        ...cartItemMap.value.get(timestamp)!,
        {
          eventUnit,
          bookingDatetime,
          duration,
        },
      ]

      cartItemMap.value.set(timestamp, newVenues)
    }
  }

  const getters = {
    venueToBook,
    mergedEventUnitsList,
    bookingTotalPriceInfo,
    cartSize,
    cartItemsDisplayList,
    cartItemMap,
  } as const

  const actions = {
    hasItem,
    handleMutateCartItems,
  }

  return { ...getters, ...actions }
})
