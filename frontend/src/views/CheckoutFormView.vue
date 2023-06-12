<script setup lang="ts">
import { createBookingsService } from "@/modules/book-venue/services/apis/create-bookings"
import { useCartStore } from "@/modules/book-venue/stores/cart.store"
import Button from "@/modules/common/components/shared-ui/atom/Button.vue"
import Input from "@/modules/common/components/shared-ui/atom/Input.vue"
import { reactive, ref } from "vue"

const cartStore = useCartStore()

const personalDetailsInitialData = {
  guestFirstName: "",
  guestLastName: "",
  guestEmail: "",
}

type TPersonalDetailsKeys = keyof typeof personalDetailsInitialData

const personalDetails = reactive<Record<TPersonalDetailsKeys, string>>({
  ...personalDetailsInitialData,
})

const paymentMethods = ref([
  {
    id: 1,
    name: "TNG eWallet",
  },
  {
    id: 2,
    name: "Credit/Debit Card",
  },
  {
    id: 3,
    name: "Online Banking",
  },
])

const selectedPaymentMethod = ref(1)

const inputsMetadata: Record<
  TPersonalDetailsKeys,
  {
    type: "text" | "email" | "password" | "number"
    placeholder: string
  }
> = {
  guestFirstName: {
    type: "text",
    placeholder: "First Name",
  },
  guestLastName: { type: "text", placeholder: "Last Name" },
  guestEmail: {
    type: "email",
    placeholder: "Email",
  },
}

const inputsMetadataList = Object.entries(inputsMetadata)

const handleOnInputPersonalDetails = (
  key: TPersonalDetailsKeys,
  value: string
) => {
  personalDetails[key] = value
}

const handleConfirmPayment = async () => {
  try {
    const bookingList = cartStore.mergedEventUnitsList.map((booking) => ({
      bookingStartDate: booking.bookingDatetime,
      eventUnitId: booking.eventUnit.eventUnitId,
      duration: booking.duration,
    }))

    await createBookingsService(bookingList, personalDetails)
  } catch (error) {
    console.log("failed to create booking", error)
  }
}

const handleSelectPaymentMethod = (paymentMethodId: number) => {
  selectedPaymentMethod.value = paymentMethodId
}
</script>

<template>
  <div class="mx-site-padding pb-[6rem]">
    <h1 class="font-semibold mb-5">How do you want to pay?</h1>
    <p class="mb-2">Pay with</p>
    <div class="mb-5">
      <div
        v-for="paymentMethod in paymentMethods"
        :class="
          'rounded-lg mb-2 p-3 ' +
          (selectedPaymentMethod === paymentMethod.id
            ? 'border-primary-light border-[2px]'
            : 'border-gray-300 border-[1px]')
        "
        @click="handleSelectPaymentMethod(paymentMethod.id)"
      >
        {{ paymentMethod.name }}
      </div>
    </div>
    <p>Personal Details</p>
    <p class="text-gray-500 mb-2">
      Receipt for the booking will be sent to your email.
    </p>
    <div class="mb-5">
      <Input
        v-for="input in inputsMetadataList"
        :value="personalDetails[input[0] as TPersonalDetailsKeys]"
        @input="
          handleOnInputPersonalDetails(
            input[0] as TPersonalDetailsKeys,
            $event.target.value
          )
        "
        :placeholder="input[1].placeholder"
        class="mb-2"
      />
    </div>
    <p>Refund policy</p>
    <p class="text-gray-500">
      We here at Courtsite believe that folks should only pay for what they use.
      Feel free to apply for refund whenever you want.
    </p>
  </div>
  <div class="bottom-action-bar">
    <Button class="w-full" @click="handleConfirmPayment"
      >Confirm and pay</Button
    >
  </div>
</template>
