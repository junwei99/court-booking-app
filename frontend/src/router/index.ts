import { useGlobalLayoutStore } from "@/modules/common/stores/global-layout.store"
import { createRouter, createWebHistory } from "vue-router"

const BookVenuePage = () => import("@/views/BookVenueView.vue")
const CartView = () => import("@/views/CartView.vue")
const VenueView = () => import("@/views/VenueView.vue")
const HomeView = () => import("@/views/HomeView.vue")
const CheckoutFormView = () => import("@/views/CheckoutFormView.vue")
const BookingStatusView = () => import("@/views/BookingStatusView.vue")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
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
      beforeEnter: () => {
        const globalLayoutStore = useGlobalLayoutStore()
        globalLayoutStore.setNavbar({ pageMode: "home", pageTitle: "" })
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
            name: "book venue",
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
      name: "book venue",
      component: BookVenuePage,
      beforeEnter: (to) => {
        // const bookVenueStore = useBookVenueStore()
        // const venueId = parseInt(to.params.venueId as string)
        // if (
        //   bookVenueStore.venueToBook.id &&
        //   venueId !== bookVenueStore.venueToBook.id
        // ) {
        //   console.log("store resetted")
        //   bookVenueStore.resetStore()
        // }
      },
      props: (route) => {
        const venueId = parseInt((route.params?.venueId as string) ?? "")
        const venueName = (route.query?.name as string) ?? ""
        const eventUnitType = (route.query?.eventUnitType as string) ?? ""

        const navigateToCartPage = () => {
          router.push({
            name: "cart",
          })
        }

        const navigateBack = () => {
          router.go(-1)
        }

        return {
          venueId,
          venueName,
          eventUnitType,
          navigateToCartPage,
          navigateBack,
        }
      },
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
      beforeEnter: () => {
        const globalLayoutStore = useGlobalLayoutStore()
        globalLayoutStore.setNavbar({
          pageMode: "checkout",
          pageTitle: "My Cart",
          showRightButton: false,
        })
      },
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutFormView,
      beforeEnter: () => {
        const globalLayoutStore = useGlobalLayoutStore()
        globalLayoutStore.setNavbar({
          pageMode: "checkout",
          showRightButton: false,
        })
      },
    },
    {
      path: "/booking-status",
      name: "booking-status",
      component: BookingStatusView,
      props: (route) => {
        const { bookingId } = route.query as { bookingId: string }
        return {
          bookingId,
        }
      },
    },
  ],
})

export default router
