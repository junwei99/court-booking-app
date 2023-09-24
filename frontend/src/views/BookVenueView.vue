<script setup lang="ts">
import BookVenuePage1 from "@/modules/book-venue/components/booking/BookVenuePage1.vue"
import BookVenuePage2 from "@/modules/book-venue/components/booking/BookVenuePage2.vue"
import { useCartStore } from "@/modules/book-venue/stores/cart.store"
import { useNewBookVenueStore } from "@/modules/book-venue/stores/new-book-venue.store"
import Button from "@/modules/common/components/shared-ui/atom/Button.vue"
import PriceCurrency from "@/modules/common/components/shared-ui/atom/PriceCurrency.vue"
import { useGlobalLayoutStore } from "@/modules/common/stores/global-layout.store"
import { storeToRefs } from "pinia"
import { computed, onMounted, ref } from "vue"

const props = defineProps<{
  venueId: number
  venueName: string
  eventUnitType: string
  navigateToCartPage: () => void
  navigateBack: () => void
}>()

const cartStore = useCartStore()

// const bookVenueStore = useBookVenueStore()
const bookVenueStore = useNewBookVenueStore()

const { formData, eventCategoryList, fetchInitBookingTimeAndDurationStatus } =
  storeToRefs(bookVenueStore)

const globalLayoutStore = useGlobalLayoutStore()

const setErrorModalState = () => {
  globalLayoutStore.setModalState({
    show: true,
    title:
      "Oops, there was an error when trying to retrieve data. Please try again later.",
    ctaCallback: props.navigateBack,
    buttonText: "Got it",
  })
}

const handleSelectEventCategory = (eventCategoryId: number) => {
  try {
    bookVenueStore.dispatchSelectItemEvent({
      type: "event-category",
      payload: eventCategoryId,
    })
  } catch (error) {
    setErrorModalState()
  }
}

const handleSelectBookingDate = (date: Date) => {
  try {
    bookVenueStore.dispatchSelectItemEvent({ type: "date", payload: date })
  } catch (error) {
    setErrorModalState()
  }
}

// const { data: categoryList } = useQuery({
//   queryKey: ["fetchCategoriesOfVenue", props.venueId],
//   queryFn: () => fetchEventCategoriesOfVenue(props.venueId),
//   staleTime: Infinity,
//   enabled: !!props.venueId,
// })

const page = ref<1 | 2>(1)

const headerBackBtnOnClick = () => {
  if (page.value === 1) {
    props.navigateBack()
  } else {
    page.value = 1
  }
}

const nextButtonOnClick = () => {
  if (page.value === 2) {
    props.navigateToCartPage()
    return
  }

  page.value = 2
}

const pageIsLoading = computed(
  () => fetchInitBookingTimeAndDurationStatus.value === "loading"
)

// watchEffect(() => {
//   if (bookVenueStore.selectedCategory === null && categoryList.value) {
//     //resets store if venueId is different from route venueId
//     bookVenueStore.handleSelectCategory(categoryList.value[0].id)
//   }
// })

onMounted(() => {
  try {
    bookVenueStore.initStore(props.venueId)
  } catch (error) {
    setErrorModalState()
  }

  globalLayoutStore.setNavbar({
    pageMode: "checkout",
    pageTitle: props.venueName,
    leftButtonAction: headerBackBtnOnClick,
  })
})
</script>

<template>
  <div class="pb-[5rem]">
    <BookVenuePage1
      v-if="page === 1"
      :category-list="eventCategoryList"
      :selected-category="formData.selectedCategory"
      :selected-date="formData.selectedDate"
      @select-category="handleSelectEventCategory"
      @select-date="handleSelectBookingDate"
    />
    <!-- second page -->
    <BookVenuePage2 v-else :type-of-location="eventUnitType" />
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
    <Button
      class="w-full"
      @click="nextButtonOnClick"
      :state="pageIsLoading ? 'loading' : 'none'"
    >
      Next
    </Button>
  </div>
</template>
