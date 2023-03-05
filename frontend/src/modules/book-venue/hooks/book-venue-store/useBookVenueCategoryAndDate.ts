import { ref } from "vue"

const initalSelectedDate = new Date()

export const useBookVenueCategoryAndDate = (
  //set to true to reset state in page2
  setIsResettingOnNext: (isResetting: boolean) => void
) => {
  const selectedDate = ref(new Date())
  const selectedCategory = ref<number | null>(null)

  const handleSelectCategory = (categoryId: number) => {
    if (
      selectedCategory.value !== null &&
      selectedCategory.value !== categoryId
    ) {
      setIsResettingOnNext(true)
    }

    selectedCategory.value = categoryId
  }

  const handleSelectDate = (newDate: Date) => {
    if (
      newDate.getTime() !== initalSelectedDate.getTime() &&
      newDate.getTime() !== selectedDate.value.getTime()
    ) {
      setIsResettingOnNext(true)
    }

    selectedDate.value = newDate
  }

  const resetCategoryAndDate = () => {
    selectedDate.value = initalSelectedDate
    selectedCategory.value = null
  }

  return {
    selectedCategory,
    selectedDate,
    handleSelectCategory,
    handleSelectDate,
    resetCategoryAndDate,
  } as const
}
