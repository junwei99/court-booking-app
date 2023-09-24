<script setup lang="ts">
import CartSection from "@/modules/book-venue/components/cart/CartSection.vue"
import { useCartStore } from "@/modules/book-venue/stores/cart.store"
import Button from "@/modules/common/components/shared-ui/atom/Button.vue"
import PriceCurrency from "@/modules/common/components/shared-ui/atom/PriceCurrency.vue"
import { EFetchStatus } from "@/others/constants/enums"
import router from "@/router"
import { ref } from "vue"

const pageFetchStatus = ref(EFetchStatus.LOADED)

const cartStore = useCartStore()

const handleCheckoutCart = () => {
  router.replace({
    name: "checkout",
  })
}
</script>

<template>
  <div>
    <div class="pb-[5rem]">
      <CartSection
        :page-fetch-status="pageFetchStatus"
        :venue-title="cartStore.venueToBook.title"
        :venue-address="cartStore.venueToBook.address"
        :venue-image="cartStore.venueToBook.images?.[0] ?? ''"
        :event-category="cartStore.eventCategoryToBook?.eventCategoryName ?? ''"
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
