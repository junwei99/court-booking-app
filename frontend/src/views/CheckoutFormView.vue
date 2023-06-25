<script setup lang="ts">
import {
  guestFormZodSchema,
  handleSubmitBooking,
} from "@/modules/book-venue/business/checkout-form.business"
import { checkoutFormInputsMetadataList } from "@/modules/book-venue/constants/checkout-form-inputs-metadata.constants"
import { useCartStore } from "@/modules/book-venue/stores/cart.store"
import type { TCheckoutFormData } from "@/modules/book-venue/types/api/booking-params.types"
import Button from "@/modules/common/components/shared-ui/atom/Button.vue"
import Input from "@/modules/common/components/shared-ui/atom/Input.vue"
import { useFormValidator } from "@/modules/common/hooks/useFormValidator"
import { computed, ref } from "vue"
import { useRouter } from "vue-router"

const cartStore = useCartStore()
const router = useRouter()

const checkoutFormData: TCheckoutFormData = {
  guestFirstName: "",
  guestLastName: "",
  guestEmail: "",
  selectedPaymentMethod: "1",
}

type TCheckoutFormKeys = keyof typeof checkoutFormData

const checkoutForm = ref<TCheckoutFormData>({
  ...checkoutFormData,
})

const createBookingStatus = ref<"none" | "loading" | "success" | "error">(
  "none"
)

const showValidationError = ref(false)

const paymentMethods = ref<
  Array<{
    id: string
    name: string
  }>
>([
  {
    id: "1",
    name: "TNG eWallet",
  },
  {
    id: "2",
    name: "Credit/Debit Card",
  },
  {
    id: "3",
    name: "Online Banking",
  },
])

const formValidator = useFormValidator(checkoutForm, guestFormZodSchema)

const handleOnInputCheckoutForm = (key: TCheckoutFormKeys, value: string) => {
  checkoutForm.value[key] = value
}

const handleConfirmPayment = async () => {
  try {
    createBookingStatus.value = "loading"
    await handleSubmitBooking(
      cartStore.mergedEventUnitsList,
      checkoutForm.value
    )
    createBookingStatus.value = "success"
    cartStore.clearCart()
    router.push({
      name: "booking-status",
    })
  } catch (error) {
    createBookingStatus.value = "error"
  }
}

const handleOnSubmitForm = async () => {
  if (
    formValidator.value.getIsFormInvalid() ||
    !formValidator.value.getIsDirty()
  ) {
    showValidationError.value = true
  }

  await handleConfirmPayment()
}

const handleSelectPaymentMethod = (paymentMethodId: string) => {
  checkoutForm.value.selectedPaymentMethod = paymentMethodId
}

const validationError = computed(() => {
  return formValidator.value.getIsDirty() || showValidationError.value
    ? formValidator.value.validateForm()
    : {}
})

const isCTADisabled = computed(
  () =>
    !formValidator.value.getIsDirty() || formValidator.value.getIsFormInvalid()
)

const ctaState = computed(() => {
  if (createBookingStatus.value === "loading") {
    return "loading"
  }
  if (isCTADisabled.value) {
    return "clickable-disabled"
  }
  return "none"
})
</script>

<template>
  <div class="mx-site-padding pb-[6rem]">
    <h1 class="font-semibold mb-5">How do you want to pay?</h1>
    <p class="mb-2">Pay with</p>
    <form @submit.prevent="handleOnSubmitForm">
      <div class="mb-5">
        <div
          v-for="paymentMethod in paymentMethods"
          :key="paymentMethod.id"
          :class="
            'rounded-lg mb-2 p-3 ' +
            (checkoutForm.selectedPaymentMethod === paymentMethod.id
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
          v-for="input in checkoutFormInputsMetadataList"
          :value="checkoutForm[input[0] as TCheckoutFormKeys]"
          @input="
            handleOnInputCheckoutForm(
              input[0] as TCheckoutFormKeys,
              $event.target.value
            )
          "
          :placeholder="input[1].placeholder"
          class="mb-2"
          :error-message="validationError?.[input[0]] ?? ''"
        />
      </div>
      <p>Refund policy</p>
      <p class="text-gray-500">
        We here at Courtsite believe that folks should only pay for what they
        use. Feel free to apply for refund whenever you want.
      </p>
      <div class="bottom-action-bar">
        <Button class="w-full" type="submit" :state="ctaState">
          Confirm and pay
        </Button>
      </div>
    </form>
  </div>
</template>
