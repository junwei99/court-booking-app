<script setup lang="ts">
import CartSection from "@/modules/book-venue/components/cart/CartSection.vue"
import { useBookVenueStore } from "@/modules/book-venue/stores/book-venue.store"
import { useCartStore } from "@/modules/book-venue/stores/cart.store"
import Button from "@/modules/common/components/shared-ui/atom/Button.vue"
import PriceCurrency from "@/modules/common/components/shared-ui/atom/PriceCurrency.vue"
import Navbar from "@/modules/common/components/shared-ui/organism/Navbar.vue"
import { EFetchStatus, NavbarPageModeEnum } from "@/others/constants/enums"
import { onMounted, ref } from "vue"

const pageFetchStatus = ref(EFetchStatus.NONE)

const cartStore = useCartStore()
const bookVenueStore = useBookVenueStore()

onMounted(() => {
  pageFetchStatus.value = EFetchStatus.LOADING
  setTimeout(() => (pageFetchStatus.value = EFetchStatus.LOADED), 50)
})
</script>

<template>
  <Navbar
    :page-mode="NavbarPageModeEnum.CHECKOUT"
    page-title="My Cart"
    :show-right-button="false"
  />
  <div>
    <div class="pb-[5rem]">
      <CartSection
        :page-fetch-status="pageFetchStatus"
        :venue-title="bookVenueStore.venueToBookLocalStorage.venueName"
        :venue-address="bookVenueStore.venueToBookLocalStorage.venueAddress"
        :venue-image="bookVenueStore.venueToBookLocalStorage.image"
        :event-category="bookVenueStore.venueToBookLocalStorage.eventCategory"
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
