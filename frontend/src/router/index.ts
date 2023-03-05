import { useBookVenueStore } from "@/modules/book-venue/stores/book-venue.store"
import { getStringQueryParam } from "@/modules/common/utils/general-utils"
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
      props: (route) => {
        const venueId = parseInt((route.params?.venueId as string) ?? "")

        const navigateToBookVenuePage = (
          venueName: string,
          eventUnitType: string
        ) => {
          router.push({
            name: "book location",
            params: { venueId },
            query: {
              name: venueName,
              eventUnitType,
            },
          })
        }

        return {
          venueId,
          navigateToBookVenuePage,
        }
      },
    },
    {
      path: "/location/:venueId/book",
      name: "book location",
      component: BookVenuePage,
      beforeEnter: (to) => {
        const bookVenueStore = useBookVenueStore()
        const venueId = parseInt(to.params.venueId as string)

        if (
          bookVenueStore.venueToBook.id &&
          venueId !== bookVenueStore.venueToBook.id
        ) {
          console.log("store resetted")
          bookVenueStore.resetStore()
        }

        if (
          typeof to.query.name === "string" &&
          typeof to.query.eventUnitType === "string"
        ) {
          bookVenueStore.setVenueToBook({
            id: venueId,
            venueName: getStringQueryParam(to.query.name),
            eventUnitType: getStringQueryParam(to.query.eventUnitType),
          })
        }
      },
      props: (route) => {
        const venueId = parseInt((route.params?.venueId as string) ?? "")

        return {
          venueId,
        }
      },
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
