<script setup lang="ts">
import {
  bedSVG,
  beverageSVG,
  mosqueSVG,
  parkingSVG,
  shopSVG,
  showerSVG,
} from "@/assets/images/icons"
import Navbar from "@/modules/common/components/shared-ui/organism/Navbar.vue"
import {
  BaseLocationInfoSection,
  BaseLocationLoadingSkeleton,
  LocationImageGallery,
} from "@/modules/venue/components"
import BaseEventCategoryIcons from "@/modules/venue/components/base-components/BaseEventCategoryIcons.vue"
import LocationCentreInfoButton from "@/modules/venue/components/centre-info/LocationCentreInfoButton.vue"
import LocationCentreInfoModal from "@/modules/venue/components/centre-info/LocationCentreInfoModal.vue"
import LocationContactUsList from "@/modules/venue/components/contact-us/LocationContactUsList.vue"
import LocationMobileBottomBar from "@/modules/venue/components/others/LocationMobileBottomBar.vue"
import { fetchVenue } from "@/modules/venue/services/apis/fetch-venue.api"
import type { IVenueRes } from "@/modules/venue/types/apis/venue-res"
import { ECentreInfoKey, NavbarPageModeEnum } from "@/others/constants/enums"
import { useQuery } from "@tanstack/vue-query"
import { computed, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()

const venueId = parseInt(route.params.venueId as string)

const {
  isFetching: venueIsFetching,
  status: venueDataStatus,
  data: venueData,
} = useQuery<IVenueRes>({
  queryKey: ["fetchVenue", venueId],
  queryFn: () => fetchVenue(venueId),
  staleTime: 60 * 1000,
  onSuccess: (res) => {
    console.log({ res })
  },
})

const centreInfoModalState = reactive<{ modalId: ECentreInfoKey }>({
  modalId: ECentreInfoKey.NONE,
})

const amenitiesList = [
  {
    name: "Hostel",
    img: { alt: "hostel icon", src: bedSVG },
  },
  { name: "Beverages", img: { alt: "beverages icon", src: beverageSVG } },
  { name: "Surau", img: { alt: "surau icon", src: mosqueSVG } },
  { name: "Parking", img: { alt: "parking icon", src: parkingSVG } },
  {
    name: "Shop",
    img: { alt: "sports retailer icon", src: shopSVG },
  },
  { name: "Shower", img: { alt: "shower icon", src: showerSVG } },
]

const amenitiesToDisplay = computed(
  () =>
    venueData.value &&
    amenitiesList.filter((amenity) =>
      venueData.value.amenities.find(
        (locAmenity) => locAmenity.name === amenity.name
      )
    )
)

const centreInfoItemMap = new Map<ECentreInfoKey, { title: string }>([
  [
    ECentreInfoKey.OPENING_HOURS,
    {
      title: "Opening hours",
    },
  ],
  [
    ECentreInfoKey.PRICING,
    {
      title: "Pricing",
    },
  ],
  [ECentreInfoKey.LAYOUT, { title: "Layout" }],
  [ECentreInfoKey.POLICY, { title: "Policy" }],
])

const handleBookButtonOnClick = () => {
  router.push({
    name: "book location",
    params: { venueId: venueId },
    query: {
      name: venueData.value?.title ? venueData.value.title : "",
      eventUnitType: "court",
    },
  })
}

const handleOpenCentreInfoModal = (modalId: ECentreInfoKey) => {
  centreInfoModalState.modalId = modalId
}
</script>

<template>
  <Navbar
    :pageMode="NavbarPageModeEnum.CHECKOUT"
    :pageTitle="venueData && venueData.title"
  />
  <div
    v-if="
      venueIsFetching === false && venueDataStatus === 'success' && venueData
    "
    class="page-width pb-20"
  >
    <LocationImageGallery :imageList="venueData.images" />
    <div
      class="m-site-padding sm:mx-0 sm:grid sm:grid-cols-[2fr_1fr] sm:gap-20"
    >
      <div>
        <h1 class="font-semibold">{{ venueData.title }}</h1>
        <p class="mt-1">{{ venueData.address }}</p>
        <BaseEventCategoryIcons :event-categories="venueData.eventCategories" />
        <div class="divider" />
        <BaseLocationInfoSection title="Description">
          <p>
            {{ venueData.description }}
          </p>
        </BaseLocationInfoSection>
        <div class="divider" />
        <template v-if="amenitiesToDisplay && amenitiesToDisplay.length > 0">
          <BaseLocationInfoSection title="Amenities">
            <div class="grid grid-cols-3 gap-10">
              <div
                v-for="icon in amenitiesToDisplay"
                :key="icon.name"
                class="flex flex-col justify-center items-center sm:items-start"
              >
                <img
                  :src="icon.img.src"
                  :alt="icon.img.alt"
                  class="w-10 h-10 mb-3"
                />
                <p class="text-xs">{{ icon.name }}</p>
              </div>
            </div>
          </BaseLocationInfoSection>
          <div class="divider" />
        </template>
        <BaseLocationInfoSection title="Centre Information">
          <LocationCentreInfoButton
            v-for="([key, centreInfoItem], index) in [...centreInfoItemMap]"
            :key="key"
            :class="index !== centreInfoItemMap.size - 1 && 'mb-3'"
            :title="`View ${centreInfoItem.title}`"
            @click="handleOpenCentreInfoModal(key)"
          />
          <LocationCentreInfoModal
            :centreInfoModalState="centreInfoModalState"
            :centreInfoItemMap="centreInfoItemMap"
            @closeCentreInfoModal="
              handleOpenCentreInfoModal(ECentreInfoKey.NONE)
            "
          />
        </BaseLocationInfoSection>
        <div class="divider" />
        <BaseLocationInfoSection title="Contact Us">
          <LocationContactUsList
            :contactUsInfo="venueData.contactUsInfo"
            :address="venueData.address"
          />
        </BaseLocationInfoSection>
      </div>
      <!-- <div class="hidden sm:block">
        <DesktopBookLocationCard />
      </div> -->
    </div>
    <!-- bottom action bar : hidden for desktop view -->
    <LocationMobileBottomBar
      :priceRange="venueData.priceRange"
      :handleBookButtonOnClick="handleBookButtonOnClick"
    />
  </div>
  <BaseLocationLoadingSkeleton v-else-if="venueIsFetching === true" />
</template>
