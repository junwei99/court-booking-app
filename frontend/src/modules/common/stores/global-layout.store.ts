import type { TNavbarPageMode } from "@/others/constants/enums"
import { defineStore } from "pinia"
import { ref } from "vue"

type TNavbarState = {
  pageMode: TNavbarPageMode
  leftButtonAction: (() => void) | undefined
  pageTitle: string
  showRightButton: boolean
}

export const useGlobalLayoutStore = defineStore("global-layout", () => {
  const navbar = ref<TNavbarState>({
    pageMode: "home",
    leftButtonAction: undefined,
    pageTitle: "",
    showRightButton: true,
  })

  const setNavbar = (globalLayoutState: Partial<TNavbarState>) => {
    navbar.value = {
      ...navbar.value,
      ...globalLayoutState,
    }
  }

  return {
    navbar,
    setNavbar,
  }
})
