<script setup lang="ts">
import BookVenuePage1 from "@/modules/book-venue/components/booking/BookVenuePage1.vue"
import BookVenuePage2 from "@/modules/book-venue/components/booking/BookVenuePage2.vue"
import { fetchEventCategoriesOfVenue } from "@/modules/book-venue/services/apis/fetch-event-categories-of-venue"
import { useBookVenueStore } from "@/modules/book-venue/stores/book-venue.store"
import { useCartStore } from "@/modules/book-venue/stores/cart.store"
import Button from "@/modules/common/components/shared-ui/atom/Button.vue"
import PriceCurrency from "@/modules/common/components/shared-ui/atom/PriceCurrency.vue"
import Navbar from "@/modules/common/components/shared-ui/organism/Navbar.vue"
import { getStringQueryParam } from "@/modules/common/utils/general-utils"
import { NavbarPageModeEnum } from "@/others/constants/enums"
import router from "@/router"
import { useQuery } from "@tanstack/vue-query"
import { watchEffect } from "vue"
import { useRoute } from "vue-router"

const cartStore = useCartStore()
const bookVenueStore = useBookVenueStore()
const route = useRoute()

const venueId = getStringQueryParam(route.params.venueId)

const { data: categoryList } = useQuery({
  queryKey: ["fetchCategoriesOfVenue", venueId],
  queryFn: () => fetchEventCategoriesOfVenue(venueId),
  staleTime: Infinity,
  enabled: !!venueId,
})

const headerBackBtnOnClick = () => {
  if (bookVenueStore.page === "1") {
    router.go(-1)
  } else {
    bookVenueStore.setPage("1")
  }
}

watchEffect(() => {
  if (
    bookVenueStore.page1SelectState.selectedCategory === null &&
    categoryList.value
  ) {
    //resets store if venueId is different from route venueId
    bookVenueStore.handleSelectCategory(categoryList.value[0].id)
  }
})
</script>

<template>
  <Navbar
    :page-mode="NavbarPageModeEnum.CHECKOUT"
    :page-title="bookVenueStore.venueToBook.name"
    :left-button-action="headerBackBtnOnClick"
  />
  <div class="pb-[5rem]">
    <!-- first page -->
    <BookVenuePage1
      v-if="bookVenueStore.page === '1'"
      :category-list="categoryList ?? []"
      :selected-category="bookVenueStore.page1SelectState?.selectedCategory"
      :selected-date="bookVenueStore.page1SelectState?.selectedDate"
      @select-category="bookVenueStore.handleSelectCategory"
      @select-date="bookVenueStore.handleSelectDate"
    />
    <!-- second page -->
    <BookVenuePage2
      v-else
      :select-items-map="bookVenueStore.selectTimeMap"
      :type-of-location="bookVenueStore.venueToBook.eventUnitType"
    />
  </div>
  <div
    v-if="
      (bookVenueStore.page === '2' && cartStore.cartSize > 0) ||
      bookVenueStore.page === '1'
    "
    :class="`bottom-action-bar ${cartStore.cartSize > 0 && 'grid grid-cols-2'}`"
  >
    <div v-if="cartStore.cartSize > 0">
      <p class="text-sm">Total Price:</p>
      <p class="font-bold text-md">
        <PriceCurrency :price="cartStore.bookingTotalPriceInfo" />
      </p>
    </div>
    <Button class="w-full" @click="bookVenueStore.nextButtonOnClick()">
      Next
    </Button>
  </div>
</template>
