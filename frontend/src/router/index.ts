import { useBookVenueStore } from "@/modules/book-venue/stores/book-venue.store"
import { getStringQueryParam } from "@/modules/common/utils/general-utils"
import { isString } from "lodash"
import { createRouter, createWebHistory } from "vue-router"

const BookVenuePage = () => import("@/views/BookVenueView.vue")
const CartView = () => import("@/views/CartView.vue")
const VenueView = () => import("@/views/VenueView.vue")
const HomeView = () => import("@/views/HomeView.vue")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      props: () => {
        const navigateToVenuePage = (venueId: number) => {
          router.push({
            name: "location",
            params: { venueId },
          })
        }

        return {
          navigateToVenuePage,
        }
      },
    },
    {
      path: "/location/:venueId",
      name: "location",
      component: VenueView,
    },
    {
      path: "/location/:venueId/book",
      name: "book location",
      component: BookVenuePage,
      beforeEnter: (to) => {
        const bookVenueStore = useBookVenueStore()
        const venueId = to.params.venueId as string

        if (
          bookVenueStore.venueToBook.id !== "" &&
          venueId !== bookVenueStore.venueToBook.id
        ) {
          console.log("store resetted")
          bookVenueStore.resetStore()
        }

        if (isString(to.query.name) && isString(to.query.eventUnitType)) {
          bookVenueStore.setVenueToBook({
            id: venueId,
            name: getStringQueryParam(to.query.name),
            eventUnitType: getStringQueryParam(to.query.eventUnitType),
          })
        }
      },
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router
