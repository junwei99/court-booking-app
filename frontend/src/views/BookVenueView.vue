<script setup lang="ts">
import BookVenuePage1 from "@/modules/book-venue/components/booking/BookVenuePage1.vue"
import BookVenuePage2 from "@/modules/book-venue/components/booking/BookVenuePage2.vue"
import { fetchEventCategoriesOfVenue } from "@/modules/book-venue/services/apis/fetch-event-categories-of-venue"
import { useBookVenueStore } from "@/modules/book-venue/stores/book-venue.store"
import { useCartStore } from "@/modules/book-venue/stores/cart.store"
import Button from "@/modules/common/components/shared-ui/atom/Button.vue"
import PriceCurrency from "@/modules/common/components/shared-ui/atom/PriceCurrency.vue"
import Navbar from "@/modules/common/components/shared-ui/organism/Navbar.vue"
import { NavbarPageModeEnum } from "@/others/constants/enums"
import { useQuery } from "@tanstack/vue-query"
import { ref, watchEffect } from "vue"

const props = defineProps<{
  venueId: number
  venueName: string
  eventUnitType: string
  navigateToCartPage: () => void
  navigateBack: () => void
}>()

const cartStore = useCartStore()
const bookVenueStore = useBookVenueStore()

const { data: categoryList } = useQuery({
  queryKey: ["fetchCategoriesOfVenue", props.venueId],
  queryFn: () => fetchEventCategoriesOfVenue(props.venueId),
  staleTime: Infinity,
  enabled: !!props.venueId,
})

const page = ref<1 | 2>(1)

const headerBackBtnOnClick = () => {
  if (page.value === 1) {
    props.navigateBack()
  } else {
    page.value = 1
  }
}

const nextButtonOnClick = () => {
  if (page.value === 1) {
    bookVenueStore.initAvailableBookingTimeAndDuration()
    //to display in cart page
    bookVenueStore.setEventCategoryOfVenueToBook(
      categoryList?.value?.find(
        (category) => category.id === (bookVenueStore?.selectedCategory ?? 0)
      )?.name ?? ""
    )
    page.value = 2
  } else {
    props.navigateToCartPage()
  }
}

watchEffect(() => {
  if (bookVenueStore.selectedCategory === null && categoryList.value) {
    //resets store if venueId is different from route venueId
    bookVenueStore.handleSelectCategory(categoryList.value[0].id)
  }
})
</script>

<template>
  <Navbar
    :page-mode="NavbarPageModeEnum.CHECKOUT"
    :page-title="venueName"
    :left-button-action="headerBackBtnOnClick"
  />
  <div class="pb-[5rem]">
    <!-- first page -->
    <BookVenuePage1
      v-if="page === 1"
      :category-list="categoryList ?? []"
      :selected-category="bookVenueStore.selectedCategory"
      :selected-date="bookVenueStore.selectedDate"
      @select-category="bookVenueStore.handleSelectCategory"
      @select-date="bookVenueStore.handleSelectDate"
    />
    <!-- second page -->
    <BookVenuePage2
      v-else
      :select-items-map="bookVenueStore.selectTimeMap"
      :type-of-location="eventUnitType"
    />
  </div>
  <div
    v-if="(page === 2 && cartStore.cartSize > 0) || page === 1"
    :class="`bottom-action-bar ${cartStore.cartSize > 0 && 'grid grid-cols-2'}`"
  >
    <div v-if="cartStore.cartSize > 0">
      <p class="text-sm">Total Price:</p>
      <p class="font-bold text-md">
        <PriceCurrency :price="cartStore.bookingTotalPriceInfo" />
      </p>
    </div>
    <Button class="w-full" @click="nextButtonOnClick"> Next </Button>
  </div>
</template>
