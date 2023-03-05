<script setup lang="ts">
import usjCourtWEBP from "@/assets/images/test-image-usj-court.webp"
import CartSection from "@/modules/book-venue/components/cart/CartSection.vue"
import { useCartStore } from "@/modules/book-venue/stores/cart.store"
import Button from "@/modules/common/components/shared-ui/atom/Button.vue"
import PriceCurrency from "@/modules/common/components/shared-ui/atom/PriceCurrency.vue"
import Navbar from "@/modules/common/components/shared-ui/organism/Navbar.vue"
import { EFetchStatus, NavbarPageModeEnum } from "@/others/constants/enums"
import { onMounted, ref } from "vue"

interface ICartItemInfo {
  locationTitle: string
  locationImageSrc: string
  category: string
  locationAddress: string
}

const pageFetchStatus = ref(EFetchStatus.NONE)

const cartItemInfo: ICartItemInfo = {
  locationTitle: "Forum 19 Badminton and Table tennis centre",
  locationImageSrc: usjCourtWEBP,
  category: "Badminton",
  locationAddress: "Kuala Lumpur, Federal Territoy of Kuala Lumpur",
}

const cartStore = useCartStore()

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
