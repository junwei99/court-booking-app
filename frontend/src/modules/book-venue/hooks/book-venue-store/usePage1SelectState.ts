import { watch } from "vue"
import { useState } from "@/modules/common/hooks/useState"

const InitialPage1SelectState = {
  selectedDate: new Date(),
  selectedCategory: null,
}

export const usePage1SelectState = (
  //set to true to reset state in page2
  setIsResettingOnNext: (isResetting: boolean) => void
) => {
  const [page1SelectState, setPage1SelectState] = useState<{
    selectedDate: Date
    selectedCategory: number | null
  }>(InitialPage1SelectState)

  const handleSelectCategory = (categoryId: number) => {
    if (
      page1SelectState.value.selectedCategory !==
        InitialPage1SelectState.selectedCategory &&
      page1SelectState.value.selectedCategory !== categoryId
    ) {
      setIsResettingOnNext(true)
    }

    setPage1SelectState({
      ...page1SelectState.value,
      selectedCategory: categoryId,
    })
  }

  const handleSelectDate = (newDate: Date) => {
    if (
      newDate.getTime() !== InitialPage1SelectState.selectedDate.getTime() &&
      newDate.getTime() !== page1SelectState.value.selectedDate.getTime()
    ) {
      setIsResettingOnNext(true)
    }

    setPage1SelectState({
      ...page1SelectState.value,
      selectedDate: newDate,
    })
  }

  const resetPage1SelectState = () => {
    setPage1SelectState({
      ...InitialPage1SelectState,
    })
  }

  return {
    page1SelectState,
    handleSelectCategory,
    handleSelectDate,
    resetPage1SelectState,
  }
}
