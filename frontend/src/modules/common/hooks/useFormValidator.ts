import { createFormValidator } from "@/modules/common/utils/form-validator.utils"
import { computed, type Ref } from "vue"
import type { z } from "zod"

export const useFormValidator = <
  TFormData extends Ref<Record<string, string | number>>,
  TZodSchema extends z.ZodObject<Record<string, z.ZodTypeAny>>
>(
  formData: TFormData,
  zodSchema: TZodSchema
) => {
  const formValidator = createFormValidator(formData.value, zodSchema)

  const reactiveFormValidator = computed(() => {
    formValidator.setFormData(formData.value)
    return formValidator
  })

  return reactiveFormValidator
}
