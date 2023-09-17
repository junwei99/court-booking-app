import type { TCheckoutFormData } from "@/modules/book-venue/types/api/booking-params.types"

export const checkoutFormInputsMetadata: Record<
  Exclude<keyof TCheckoutFormData, "selectedPaymentMethod">,
  {
    type: "text" | "email" | "password" | "number" | "select"
    placeholder?: string
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

export const checkoutFormInputsMetadataList = Object.entries(
  checkoutFormInputsMetadata
)
