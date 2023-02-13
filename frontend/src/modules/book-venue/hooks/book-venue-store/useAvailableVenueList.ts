import type { IVenueState } from "@/modules/book-venue/types/stores/book-venue-store.types"
import { EFetchStatus } from "@/others/constants/enums"
import { reactive } from "vue"
import type { IEventUnitItem } from "@/modules/common/types/venue.types"
import { useCartStore } from "@/modules/book-venue/stores/cart.store"

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
    fetchCallback: () => Promise<Array<IEventUnitItem>>,
    bookingDuration: number,
    bookingDatetime: Date
  ) => {
    venueState.venueFetchStatus = EFetchStatus.LOADING

    const availableEventUnitListRes = await fetchCallback()

    venueState.availableVenueList = availableEventUnitListRes.filter(
      (eventUnit) =>
        !cartStore.hasItem(
          eventUnit.eventUnitId,
          bookingDuration,
          bookingDatetime
        )
    )

    venueState.venueFetchStatus = EFetchStatus.LOADED
  }

  return {
    venueState,
    clearVenues,
    setFetchedEventUnits,
  }
}
