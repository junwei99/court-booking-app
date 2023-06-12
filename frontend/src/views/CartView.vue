<script setup lang="ts">
import CartSection from "@/modules/book-venue/components/cart/CartSection.vue"
import { useCartStore } from "@/modules/book-venue/stores/cart.store"
import Button from "@/modules/common/components/shared-ui/atom/Button.vue"
import PriceCurrency from "@/modules/common/components/shared-ui/atom/PriceCurrency.vue"
import { EFetchStatus } from "@/others/constants/enums"
import router from "@/router"
import { onMounted, ref } from "vue"

const pageFetchStatus = ref(EFetchStatus.NONE)

const cartStore = useCartStore()

const handleCheckoutCart = () => {
  router.push({
    name: "checkout",
  })
}

onMounted(() => {
  pageFetchStatus.value = EFetchStatus.LOADING
  setTimeout(() => (pageFetchStatus.value = EFetchStatus.LOADED), 50)

  console.log({ cartStore })
})
</script>

<template>
  <div>
    <div class="pb-[5rem]">
      <CartSection
        :page-fetch-status="pageFetchStatus"
        :venue-title="cartStore.venueToBookLS.venueName"
        :venue-address="cartStore.venueToBookLS.venueAddress"
        :venue-image="cartStore.venueToBookLS.image"
        :event-category="cartStore.venueToBookLS.eventCategory"
        :cart-item-display-list="cartStore.cartItemsDisplayList"
        :total-price="cartStore.bookingTotalPriceInfo"
      />
    </div>
    <div class="bottom-action-bar">
      <Button
        v-if="pageFetchStatus === EFetchStatus.LOADED"
        class="w-full"
        @click="handleCheckoutCart"
        >Checkout Cart -
        <PriceCurrency :price="cartStore.bookingTotalPriceInfo"
      /></Button>
      <div v-else class="skeleton-pulse w-full h-[3rem] rounded-lg"></div>
    </div>
  </div>
</template>
