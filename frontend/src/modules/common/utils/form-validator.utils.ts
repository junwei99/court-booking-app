import { z } from "zod"

export const createFormValidator = <
  TFormData extends Record<string, string | number>,
  TZodSchema extends z.ZodObject<Record<string, z.ZodTypeAny>>
>(
  initialFormData: TFormData,
  zodSchema: TZodSchema
) => {
  const initialFormDataValue = { ...initialFormData }
  let formData: TFormData = { ...initialFormData }
  let validationError: Record<string, string> = {}

  const getValidationError = (formData: TFormData) => {
    const validateErr: Record<string, string> = {}
    try {
      zodSchema.parse(formData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((error) => {
          validateErr[error.path[0]] = error.message
        })
      }
    }
    return validateErr
  }

  const validateForm = () => {
    const err = getValidationError({ ...formData })
    validationError = err
    return err
  }

  const getIsFormInvalid = () => Object.keys(validationError).length > 0

  const getIsDirty = () => {
    return Object.keys(formData).some(
      (key) => formData[key] !== initialFormDataValue[key]
    )
  }

  const getFormData = () => {
    return { ...formData }
  }

  const setFormData = (newFormData: TFormData) => {
    formData = { ...newFormData }
  }

  return {
    validateForm,
    getIsFormInvalid,
    getIsDirty,
    getFormData,
    setFormData,
  }
}
