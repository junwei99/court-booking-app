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
  const defaultNavbarState: TNavbarState = {
    pageMode: "home",
    leftButtonAction: undefined,
    pageTitle: "",
    showRightButton: true,
  }

  const navbar = ref<TNavbarState>({
    ...defaultNavbarState,
  })

  const INITIAL_MODAL_STATE = {
    show: false,
    title: "",
    ctaCallback: null,
    buttonText: "",
  }

  const modal = ref<{
    show: boolean
    title: string
    ctaCallback: (() => void) | null
    buttonText: string
  }>({ ...INITIAL_MODAL_STATE })

  const setNavbar = (globalLayoutState: Partial<TNavbarState>) => {
    navbar.value = {
      ...defaultNavbarState,
      ...globalLayoutState,
    }
  }

  const setModalState = ({
    show = false,
    title = "",
    ctaCallback = null,
    buttonText = "",
  }: {
    show?: boolean
    title?: string
    ctaCallback?: (() => void) | null
    buttonText?: string
  }) => {
    modal.value = {
      show,
      title,
      ctaCallback,
      buttonText,
    }
  }

  const resetModalState = () => {
    modal.value = { ...INITIAL_MODAL_STATE }
  }

  return {
    navbar,
    modal,
    setNavbar,
    setModalState,
    resetModalState,
  }
})
