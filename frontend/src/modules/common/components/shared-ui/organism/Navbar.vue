<script setup lang="ts">
import { useCartStore } from "@/modules/book-venue/stores/cart.store"
import type { TNavbarPageMode } from "@/others/constants/enums"
import { computed, ref } from "vue"
import { useRouter } from "vue-router"

interface IPageNavbarProps {
  leftButtonAction: () => void
  pageTitle: string
}

const router = useRouter()
const cartStore = useCartStore()

const props = withDefaults(
  defineProps<{
    pageMode: TNavbarPageMode
    leftButtonAction?: () => void
    pageTitle?: string
    showRightButton?: boolean
  }>(),
  { pageMode: "home", showRightButton: true }
)

const cartTooltip = ref("")

// const showNavbar = ref(true)
// let lastScrollPosition = 0

// const onScroll = (): void => {
//   // Get the current scroll position
//   const currentScrollPosition =
//     window.pageYOffset || document.documentElement.scrollTop
//   // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
//   if (currentScrollPosition < 0) {
//     return
//   }
//   // Here we determine whether we need to show or hide the navbar
//   showNavbar.value = currentScrollPosition < lastScrollPosition
//   // Set the current scroll position as the last scroll position
//   lastScrollPosition = currentScrollPosition
// }

const NavbarModeMap = computed(
  () =>
    new Map<TNavbarPageMode, IPageNavbarProps>([
      [
        "checkout",
        {
          leftButtonAction: props.leftButtonAction
            ? props.leftButtonAction
            : () => router.go(-1),
          pageTitle: props.pageTitle ? props.pageTitle : "",
        },
      ],
      [
        "home",
        {
          leftButtonAction: () => console.log("haha"),
          pageTitle: "Courtsite",
        },
      ],
    ])
)

const logoOnClick = () => {
  router.push({
    name: "home",
  })
}

const cartOnClick = () => {
  if (cartStore.cartSize > 0) {
    router.push({ name: "cart" })
  } else {
    cartTooltip.value = "Cart is empty"
  }
}

const cartOnClickAway = () => {
  cartTooltip.value = ""
}

// onMounted(() => window.addEventListener("scroll", onScroll));

// onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <!-- <div
    :class="`navbar bg-base-100 sticky top-0 z-20 duration-300 ${
      !showNavbar && '-translate-y-full'
    }`"
  > -->
  <div
    :class="`bg-base-100 sticky top-0 z-20 duration-300 grid grid-cols-[1fr_4fr_1fr] py-2 items-center min-h-[3.8rem]`"
  >
    <div v-if="pageMode === 'home'" class="dropdown pl-3">
      <label tabindex="0" class="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </label>
      <ul
        tabindex="0"
        class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li><a>Homepage</a></li>
        <li><a>Portfolio</a></li>
        <li><a>About</a></li>
      </ul>
    </div>
    <button
      v-if="pageMode === 'checkout'"
      @click="NavbarModeMap.get('checkout')?.leftButtonAction()"
      class="pl-5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
    <div class="flex justify-center">
      <a
        class="p-0 m-0 h-full flex flex-col font-semibold"
        @click="logoOnClick"
      >
        <h3 class="line-clamp-1 items-center">
          {{ NavbarModeMap.get(pageMode)?.pageTitle }}
        </h3>
      </a>
    </div>
    <div v-if="pageMode === 'home'" class="pr-3">
      <button class="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
    <div v-if="pageMode === 'checkout'" class="flex justify-end pr-3">
      <div
        v-if="showRightButton"
        :class="`${
          cartTooltip && 'tooltip tooltip-open'
        } tooltip-left transition-all`"
        @focusin="cartOnClick"
        @focusout="cartOnClickAway"
        :data-tip="cartTooltip"
      >
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span
              v-if="cartStore.cartSize > 0"
              class="badge badge-sm indicator-item bg-primary-normal border-none"
              >{{ cartStore.cartSize }}</span
            >
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
