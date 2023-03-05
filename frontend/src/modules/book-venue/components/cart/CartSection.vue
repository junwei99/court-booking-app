<script setup lang="ts">
import CartBottomSkeleton from "@/modules/book-venue/components/cart/CartBottomSkeleton.vue"
import CartTopSkeleton from "@/modules/book-venue/components/cart/CartTopSkeleton.vue"
import PriceCurrency from "@/modules/common/components/shared-ui/atom/PriceCurrency.vue"
import SquareImage from "@/modules/common/components/shared-ui/atom/SquareImage.vue"
import { EFetchStatus } from "@/others/constants/enums"

interface ICartItemInfo {
  locationTitle: string
  locationImageSrc: string
  category: string
  locationAddress: string
}

type TDisplayCartItem = {
  bookingDate: string
  eventUnitList: Array<{
    id: string
    eventUnitName: string
    bookingTimeFrame: string
    price: number
  }>
}

defineProps<{
  pageFetchStatus: EFetchStatus
  cartItemInfo: ICartItemInfo
  cartItemDisplayList: Array<TDisplayCartItem>
  totalPrice: number
}>()
</script>

<template>
  <div>
    <div class="grid grid-cols-[2fr_3fr] gap-4 m-site-padding">
      <template v-if="pageFetchStatus === EFetchStatus.LOADED"
        ><SquareImage
          containerClass="rounded-2xl"
          :imageSrc="cartItemInfo.locationImageSrc"
          :imageAlt="cartItemInfo.locationTitle"
        />
        <div>
          <p class="font-semibold text-primary-normal">
            {{ cartItemInfo.category.toUpperCase() }}
          </p>
          <p class="mb-1">
            {{ cartItemInfo.locationTitle }}
          </p>
          <p class="text-xs">
            {{ cartItemInfo.locationAddress }}
          </p>
        </div></template
      >
      <CartTopSkeleton v-else />
    </div>
    <div class="hidden sm:block"><div class="divider" /></div>
    <div class="thick-divider sm:hidden"></div>
    <div class="m-site-padding mb-0">
      <template v-if="pageFetchStatus === EFetchStatus.LOADED">
        <h2 class="font-semibold">Booking Details</h2>
        <div
          v-for="cartItem in cartItemDisplayList"
          :key="cartItem.bookingDate"
          class="mt-2 mb-5"
        >
          <p class="font-semibold mb-2">{{ cartItem.bookingDate }}</p>
          <div
            v-for="eventUnit in cartItem.eventUnitList"
            :key="eventUnit.id"
            class="flex mb-1 justify-between"
          >
            <div class="flex">
              <p class="mr-2">{{ eventUnit.eventUnitName }} :</p>
              <p>
                {{ eventUnit.bookingTimeFrame }}
              </p>
            </div>
            <p><PriceCurrency :price="eventUnit.price" /></p>
          </div>
        </div>
        <div class="divider"></div>
        <div>
          <div class="flex justify-between">
            <h2 class="font-semibold">Total</h2>
            <h3><PriceCurrency :price="totalPrice" /></h3>
          </div>
        </div>
      </template>
      <CartBottomSkeleton v-else />
    </div>
  </div>
</template>
