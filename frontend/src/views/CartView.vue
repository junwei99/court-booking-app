<script setup lang="ts">
import { ref, onMounted } from "vue"
import Navbar from "@/modules/common/components/shared-ui/organism/Navbar.vue"
import usjCourtWEBP from "@/assets/images/test-image-usj-court.webp"
import { EFetchStatus, NavbarPageModeEnum } from "@/others/constants/enums"
import CartSection from "@/modules/book-venue/components/cart/CartSection.vue"
import Button from "@/modules/common/components/shared-ui/atom/Button.vue"
import PriceCurrency from "@/modules/common/components/shared-ui/atom/PriceCurrency.vue"
import BookLocationSelectDate from "@/modules/book-venue/components/booking/BookVenuePage1.vue"
import { useBookVenueStore } from "@/modules/book-venue/stores/book-venue.store"
import { useCartStore } from "@/modules/book-venue/stores/cart.store"

interface ICartItemInfo {
  locationTitle: string
  locationImageSrc: string
  category: string
  locationAddress: string
  bookingDetailsList: Array<{
    bookingDetailId: string
    datetime: string
    currentDateTimeBookingInfoList: Array<{
      bookLocationId: string
      timeslot: {
        startTime: string
        endTime: string
      }
      name: string
      price: number
    }>
  }>
  total: number
}

const pageFetchStatus = ref(EFetchStatus.NONE)

const cartItemInfo: ICartItemInfo = {
  locationTitle: "Forum 19 Badminton and Table tennis centre",
  locationImageSrc: usjCourtWEBP,
  category: "Badminton",
  locationAddress: "Kuala Lumpur, Federal Territoy of Kuala Lumpur",
  bookingDetailsList: [
    {
      bookingDetailId: "BD1",
      datetime: "16 Sep 2022, Friday",
      currentDateTimeBookingInfoList: [
        {
          bookLocationId: "BL1",
          timeslot: { startTime: "07:00PM", endTime: "08:00PM" },
          name: "Court 1",
          price: 34,
        },
      ],
    },
    {
      bookingDetailId: "BD2",
      datetime: "17 Sep 2022, Saturday",
      currentDateTimeBookingInfoList: [
        {
          bookLocationId: "BL3",
          timeslot: { startTime: "08:00PM", endTime: "10:00PM" },
          name: "Court 1",
          price: 34,
        },
        {
          bookLocationId: "BL4",
          timeslot: { startTime: "08:00PM", endTime: "10:00PM" },
          name: "Court 2",
          price: 45,
        },
      ],
    },
  ],
  total: 113,
}

const categoryList = [
  { id: "1", name: "Futsal" },
  { id: "2", name: "Badminton" },
]

//gridCol is the width ratio of each select item
// const selectItemMapOnPage2 = new Map<
//   TSelectKey,
//   {
//     list: Array<{
//       text: string
//       disabled?: boolean
//     }>
//   }
// >([
//   [
//     "time1",
//     {
//       list: [
//         { text: "Select time", disabled: true },
//         { text: "1:00" },
//         { text: "2:00" },
//         { text: "3:00" },
//         { text: "4:00" },
//         { text: "5:00" },
//         { text: "6:00" },
//         { text: "7:00" },
//         { text: "6:00" },
//         { text: "7:00" },
//         { text: "8:00" },
//         { text: "9:00" },
//         { text: "10:00" },
//         { text: "11:00" },
//         { text: "12:00" },
//       ],
//     },
//   ],
//   [
//     "time2",
//     {
//       list: [
//         { text: "AM / PM", disabled: true },
//         { text: "AM" },
//         { text: "PM" },
//       ],
//     },
//   ],
//   [
//     "duration",
//     {
//       list: [
//         { text: "Select duration", disabled: true },
//         { text: "30 minutes" },
//         { text: "1 hour" },
//         { text: "1 hour 30 minutes" },
//         { text: "2 hours" },
//       ],
//     },
//   ],
// ])

// const locationInfo = {
//   locationName: "Forum 19 Badminton and Table tennis centre",
//   typeOfLocation: "court",
//   category: { categoryId: "1", name: "futsal" },
// }

const bookVenueStore = useBookVenueStore()
const cartStore = useCartStore()

onMounted(() => {
  pageFetchStatus.value = EFetchStatus.LOADING
  setTimeout(() => (pageFetchStatus.value = EFetchStatus.LOADED), 50)
  console.log({
    data: cartStore.cartItemsDisplayList,
    total: cartStore.bookingTotalPriceInfo,
  })
})
</script>

<template>
  <Navbar
    :page-mode="NavbarPageModeEnum.CHECKOUT"
    page-title="My Cart"
    :show-right-button="false"
  />
  <!-- TODO -->
  <!-- desktop view -->
  <div class="hidden sm:block page-width">
    <div class="sm:grid sm:grid-cols-2 gap-12 mt-10">
      <div>
        <!-- first page -->
        <BookLocationSelectDate
          v-if="bookVenueStore.page === '1'"
          :category-list="categoryList"
          :selected-date="bookVenueStore.page1SelectState?.selectedDate"
          :selected-category="bookVenueStore.page1SelectState?.selectedCategory"
          @select-category="bookVenueStore.handleSelectCategory"
          @select-date="bookVenueStore.handleSelectDate"
        />
        <div class="divider mx-site-padding" />
        <!-- second page -->
        <!-- <BookLocationPage2
          :select-items-map="selectItemMapOnPage2"
          :locationInfo="locationInfo"
        /> -->
      </div>
      <div>
        <div class="card bg-base-100 shadow-xl">
          <CartSection
            :page-fetch-status="pageFetchStatus"
            :cart-item-info="cartItemInfo"
            :cart-item-display-list="cartStore.cartItemsDisplayList"
            :total-price="cartStore.bookingTotalPriceInfo"
          />
          <div class="p-site-padding">
            <Button
              v-if="pageFetchStatus === EFetchStatus.LOADED"
              class="w-full"
              >Checkout Cart - <PriceCurrency :price="cartItemInfo.total"
            /></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- mobile view -->
  <div class="sm:hidden">
    <div class="pb-[5rem]">
      <CartSection
        :page-fetch-status="pageFetchStatus"
        :cart-item-info="cartItemInfo"
        :cart-item-display-list="cartStore.cartItemsDisplayList"
        :total-price="cartStore.bookingTotalPriceInfo"
      />
    </div>
    <div class="bottom-action-bar">
      <Button v-if="pageFetchStatus === EFetchStatus.LOADED" class="w-full"
        >Checkout Cart -
        <PriceCurrency :price="cartStore.bookingTotalPriceInfo"
      /></Button>
      <div v-else class="skeleton-pulse w-full h-[3rem] rounded-lg"></div>
    </div>
  </div>
</template>
