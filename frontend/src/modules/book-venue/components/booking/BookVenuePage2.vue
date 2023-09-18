<script setup lang="ts">
import {
  BookVenueBackButton,
  BookVenuePage2None,
  BookVenuePage2SelectSection,
  BookVenuePage2Skeleton,
  BookVenuePage2VenueList,
} from "@/modules/book-venue/components/booking/book-venue-page-2"
import BookVenuePage2EmptyList from "@/modules/book-venue/components/booking/book-venue-page-2/BookVenuePage2EmptyList.vue"
import { useBookVenueStore } from "@/modules/book-venue/stores/book-venue.store"
import { useCartStore } from "@/modules/book-venue/stores/cart.store"
import type { TSelectTimeMap } from "@/modules/book-venue/types/components"
import type { IEventUnitItem } from "@/modules/common/types/venue.types"
import { EFetchStatus } from "@/others/constants/enums"
import { storeToRefs } from "pinia"

defineProps<{
  typeOfLocation: string
  selectItemsMap: TSelectTimeMap
  showBackButton?: boolean
}>()

const emit = defineEmits<{
  (e: "desktopBackToPage1"): void
}>()

const cartStore = useCartStore()
const bookVenueStore = useBookVenueStore()

const { venueState } = storeToRefs(bookVenueStore)

const handleDesktopBackToPage1 = () => {
  emit("desktopBackToPage1")
}

const handleMutateCartItems = (eventUnit: IEventUnitItem) =>
  cartStore.handleMutateCartItems(
    eventUnit,
    parseInt(bookVenueStore.bookVenueTimeAndDuration.selectedDuration),
    bookVenueStore.bookingDateTime,
    bookVenueStore.venueToBook
  )

const cartHasItem = (eventUnitId: number) => {
  return cartStore.hasItem(
    eventUnitId,
    parseInt(bookVenueStore.bookVenueTimeAndDuration.selectedDuration),
    bookVenueStore.bookingDateTime
  )
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
      :select-items-map="selectItemsMap"
      :get-select-value="bookVenueStore.getTimeAndDurationValueFromKey"
      @handle-select-item-on-change="
        bookVenueStore.handleSelectTimeAndDurationOnChange
      "
    />
    <div>
      <div class="divider" />
      <h2 class="font-semibold mb-5">Select your {{ typeOfLocation }}</h2>
      <BookVenuePage2None
        v-if="venueState.venueFetchStatus === EFetchStatus.NONE"
        :type-of-location="typeOfLocation"
      />
      <!-- loading skeleton -->
      <BookVenuePage2Skeleton
        v-if="venueState.venueFetchStatus === EFetchStatus.LOADING"
      />
      <!-- locations list when item is finished loading -->
      <template v-if="venueState.venueFetchStatus === EFetchStatus.LOADED">
        <BookVenuePage2VenueList
          v-if="venueState.availableVenueList.length > 0"
          :venue-fetch-status="EFetchStatus.LOADED"
          :available-event-unit-list="venueState.availableVenueList"
          :booking-datetime="new Date()"
          :handle-mutate-cart-items="handleMutateCartItems"
          :has-item="cartHasItem"
        />
        <BookVenuePage2EmptyList
          v-else-if="venueState.availableVenueList.length === 0"
          :type-of-location="typeOfLocation"
        />
      </template>
    </div>
  </div>
</template>
