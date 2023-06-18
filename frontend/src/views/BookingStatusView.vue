<script setup lang="ts">
import checkSymbol from "@/assets/images/icons/check-symbol.svg"
import Button from "@/modules/common/components/shared-ui/atom/Button.vue"
import { useRouter } from "vue-router"

const router = useRouter()

const handleNavigateToHome = () => {
  router.push({
    name: "home",
  })
}

const bookingDetails = [
  ["Booking no", "20"],
  ["Email", "test@gmail.com"],
  ["Court name", "222 PJ Sports"],
  ["Total amount", "RM 40"],
]
</script>

<template>
  <div class="mx-site-padding mt-5 flex justify-center">
    <div class="flex flex-col items-center w-full text-center">
      <img
        class="w-[30%] h-[30%] max-h-[10rem] mb-5"
        :src="checkSymbol"
        alt="successful booking"
      />
      <div class="mx-5">
        <h1 class="font-semibold mb-2">Successfully booked!</h1>
        <p class="text-center mb-5">
          Please check your email for booking receipt and booking details.
        </p>
        <div
          v-for="booking in bookingDetails"
          :key="booking[0]"
          class="flex w-full justify-between mb-2"
        >
          <div class="w-[48%] text-left">{{ booking[0] }}</div>
          <div class="w-[48%] text-right font-bold">{{ booking[1] }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-action-bar">
    <Button class="w-full" @click="handleNavigateToHome">Back to site</Button>
  </div>
</template>
