<script setup lang="ts">
import checkSymbol from "@/assets/images/icons/check-symbol.svg"
import failSVG from "@/assets/images/icons/fail.svg"
import { fetchBooking } from "@/modules/book-venue/services/apis/fetch-booking"
import Button from "@/modules/common/components/shared-ui/atom/Button.vue"
import PriceCurrency from "@/modules/common/components/shared-ui/atom/PriceCurrency.vue"
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const handleNavigateToHome = () => {
  router.push({
    name: "home",
  })
}

const props = defineProps<{ bookingId: string }>()

const bookingDetails = ref<(string | number)[][]>([])
const bookingStatus = ref<"none" | "success" | "failed">("none")

const hydrateBookingInfo = async () => {
  try {
    const bookingInfo = await fetchBooking(props.bookingId)

    if (bookingInfo.status !== "success") {
      throw new Error("failed to book")
    }

    const bookingMap = {
      "Booking no": props.bookingId,
      Email: bookingInfo.booking.guestEmail ?? "",
      "Court name": `${bookingInfo.booking.venueName}`,
      "Total amount": bookingInfo.booking.totalAmount,
    }
    const bookingDetailsList = Object.entries(bookingMap)

    bookingDetails.value = bookingDetailsList
    bookingStatus.value = "success"
  } catch (error) {
    bookingStatus.value = "failed"
  }
}

const bookingInfo = computed(() => {
  if (bookingStatus.value === "success") {
    return {
      svgIcon: checkSymbol,
      title: "Successfully booked!",
      description:
        "Please check your email for booking receipt and booking details.",
    }
  }

  return {
    svgIcon: failSVG,
    title: "Oops, an error occurred when trying to book.",
    description:
      "There is an unexpected error when trying to book. Please try again later.",
  }
})

onMounted(hydrateBookingInfo)
</script>

<template>
  <div class="mx-site-padding mt-5 flex justify-center">
    <div class="flex flex-col items-center w-full text-center">
      <img
        class="w-[30%] h-[30%] max-h-[10rem] mb-5"
        :src="bookingInfo.svgIcon"
        alt="successful booking"
      />
      <div>
        <h1 class="font-semibold mb-2">{{ bookingInfo.title }}</h1>
        <p class="text-center mb-5">
          {{ bookingInfo.description }}
        </p>
        <div
          v-for="booking in bookingDetails"
          :key="booking[0]"
          class="flex w-full justify-between mb-2"
        >
          <div class="w-[28%] text-left">{{ booking[0] }}</div>
          <div class="w-[68%] text-right font-bold break-all">
            <PriceCurrency
              v-if="
                booking[0] === 'Total amount' && typeof booking[1] === 'number'
              "
              :price="booking[1]"
            />
            <template v-else>
              {{ booking[1] }}
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-action-bar">
    <Button class="w-full" @click="handleNavigateToHome">Back to site</Button>
  </div>
</template>
