<script setup lang="ts">
import {
  BookVenueBackButton,
  BookVenuePage2EmptyList,
  BookVenuePage2None,
  BookVenuePage2SelectSection,
  BookVenuePage2Skeleton,
  BookVenuePage2VenueList,
} from "@/modules/book-venue/components/booking/book-venue-page-2"
import { useCartStore } from "@/modules/book-venue/stores/cart.store"
import { useNewBookVenueStore } from "@/modules/book-venue/stores/new-book-venue.store"
import type { TBookingTimeSelectItemType } from "@/modules/book-venue/types/stores/book-venue-store.types"
import type { IEventUnitItem } from "@/modules/common/types/venue.types"
import { storeToRefs } from "pinia"

defineProps<{
  typeOfLocation: string
  showBackButton?: boolean
}>()

const emit = defineEmits<{
  (e: "desktopBackToPage1"): void
}>()

const cartStore = useCartStore()
// const bookVenueStore = useBookVenueStore()
const bookVenueStore = useNewBookVenueStore()
const {
  formData,
  availableBookingTimeList,
  fetchEventUnitsToBookStatus,
  eventsUnitToBookList,
  venueIdToBook,
  bookingDateTime,
  venueInfo,
} = storeToRefs(bookVenueStore)

// const { venueState } = storeToRefs(bookVenueStore)

const handleDesktopBackToPage1 = () => {
  emit("desktopBackToPage1")
}

//TODO: should we use server or local implementation? if server, need to write auth too
const handleMutateCartItems = (eventUnit: IEventUnitItem) => {
  if (!venueIdToBook.value) {
    return
  }

  cartStore.handleMutateCartItems(
    eventUnit,
    formData.value.selectedDuration,
    bookingDateTime.value,
    venueInfo.value
  )
}

const cartHasItem = (eventUnitId: number) =>
  cartStore.hasItem(
    eventUnitId,
    formData.value.selectedDuration,
    bookingDateTime.value
  )

const selectBookingTimeItem = ({
  type,
  payload,
}: {
  type: TBookingTimeSelectItemType
  payload: string
}) => {
  if (type === "duration") {
    return bookVenueStore.dispatchSelectItemEvent({
      type,
      payload: parseInt(payload),
    })
  }

  if (type === "amPm" && (payload === "AM" || payload === "PM")) {
    return bookVenueStore.dispatchSelectItemEvent({
      type,
      payload,
    })
  }

  if (type === "time") {
    return bookVenueStore.dispatchSelectItemEvent({
      type,
      payload,
    })
  }
}
</script>

<template>
  <div class="p-site-padding">
    <BookVenueBackButton
      v-if="showBackButton"
      @click="handleDesktopBackToPage1"
    />
    <h2 class="font-semibold mb-5">Select a start time and duration</h2>
    <BookVenuePage2SelectSection
      :available-booking-time-list="availableBookingTimeList"
      :form-data="formData"
      @select-item="selectBookingTimeItem"
    />
    <div>
      <div class="divider" />
      <h2 class="font-semibold mb-5">Select your {{ typeOfLocation }}</h2>
      <BookVenuePage2None
        v-if="fetchEventUnitsToBookStatus === 'none'"
        :type-of-location="typeOfLocation"
      />
      <!-- loading skeleton -->
      <BookVenuePage2Skeleton
        v-if="fetchEventUnitsToBookStatus === 'loading'"
      />
      <!-- locations list when item is finished loading -->
      <template v-if="fetchEventUnitsToBookStatus === 'fetched'">
        <BookVenuePage2VenueList
          v-if="eventsUnitToBookList.length > 0"
          :available-event-unit-list="eventsUnitToBookList"
          :handle-mutate-cart-items="handleMutateCartItems"
          :has-item="cartHasItem"
        />
        <BookVenuePage2EmptyList v-else :type-of-location="typeOfLocation" />
      </template>
    </div>
  </div>
</template>
