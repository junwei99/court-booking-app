import { useCartStore } from "@/modules/book-venue/stores/cart.store"
import type { IVenueState } from "@/modules/book-venue/types/stores/book-venue-store.types"
import { EFetchStatus } from "@/others/constants/enums"
import { reactive } from "vue"
import type { IFetchAvailableEventUnitsToBookRes } from "../../types/api"

export const useAvailableVenueList = () => {
  const venueState = reactive<IVenueState>({
    availableVenueList: [],
    venueFetchStatus: EFetchStatus.NONE,
  })

  const cartStore = useCartStore()

  const clearVenues = () => {
    venueState.availableVenueList = []
    venueState.venueFetchStatus = EFetchStatus.NONE
  }

  const setFetchedEventUnits = async (
    fetchCallback: () => Promise<
      IFetchAvailableEventUnitsToBookRes["availableEventUnitsToBook"]
    >,
    bookingDuration: number,
    bookingDatetime: Date
  ) => {
    venueState.venueFetchStatus = EFetchStatus.LOADING

    const availableEventUnitsToBook = await fetchCallback()

    venueState.availableVenueList =
      availableEventUnitsToBook?.filter(
        (eventUnit) =>
          !cartStore.hasItem(
            eventUnit.eventUnitId,
            bookingDuration,
            bookingDatetime
          )
      ) ?? []

    venueState.venueFetchStatus = EFetchStatus.LOADED
  }

  return {
    venueState,
    clearVenues,
    setFetchedEventUnits,
  }
}
