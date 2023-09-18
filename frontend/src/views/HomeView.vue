<script setup lang="ts">
import badmintonJPG from "@/assets/images/badminton.jpeg"
import basketballJPG from "@/assets/images/basketball.jpeg"
import bowlingJPG from "@/assets/images/bowling.jpeg"
import cricketJPG from "@/assets/images/cricket.jpeg"
import danceStudioJPG from "@/assets/images/dance_studio.jpeg"
import dodgeballJPG from "@/assets/images/dodgeball.jpeg"
import footballJPG from "@/assets/images/football.jpeg"
import freeDivingJPG from "@/assets/images/free_diving.jpeg"
import futsalJPG from "@/assets/images/futsal.jpeg"
import Button from "@/modules/common/components/shared-ui/atom/Button.vue"
import ItemCard from "@/modules/common/components/shared-ui/organism/ItemCard.vue"
import HomeSkeleton from "@/modules/home/components/HomeSkeleton.vue"
import { fetchVenueList } from "@/modules/home/services/apis/fetch-venue-list.api"
import type { IVenueListRes } from "@/modules/home/types/apis/home.types"
import { useQuery } from "@tanstack/vue-query"
import "swiper/css"
import type { Swiper as SwiperClass } from "swiper/types"
import { Swiper, SwiperSlide } from "swiper/vue"

const props = defineProps<{ navigateToVenuePage: (venueId: number) => void }>()

const {
  status: venueListStatus,
  data: venueList,
  refetch: refetchVenueList,
} = useQuery<IVenueListRes["venueList"]>({
  queryKey: ["fetchVenues"],
  queryFn: () => fetchVenueList(),
  staleTime: 60 * 1000,
})

const navItemsList = [
  { id: "1", title: "Badminton", icon: badmintonJPG },
  { id: "2", title: "Basketball", icon: basketballJPG },
  { id: "3", title: "Bowling", icon: bowlingJPG },
  { id: "4", title: "Cricket", icon: cricketJPG },
  { id: "5", title: "Dance", icon: danceStudioJPG },
  { id: "6", title: "Dodgeball", icon: dodgeballJPG },
  { id: "7", title: "Football", icon: footballJPG },
  { id: "8", title: "Diving", icon: freeDivingJPG },
  { id: "9", title: "Futsal", icon: futsalJPG },
]

const onSwiper = (swiper: SwiperClass) => {}

const onSlideChange = (swiper: SwiperClass) => {}

const itemCardOnClick = (venueId: number) => {
  props.navigateToVenuePage(venueId)
}
</script>

<template>
  <div class="page-width">
    <Swiper
      class="mt-2 sm:mb-10"
      :slides-per-view="4"
      :space-between="5"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <SwiperSlide v-for="navItem in navItemsList" :key="navItem.id"
        ><div class="flex flex-col items-center w-full mx-site-padding">
          <img class="rounded-[100%] h-[4rem] w-[4rem]" :src="navItem.icon" />
          <p class="mt-2">{{ navItem.title }}</p>
        </div>
      </SwiperSlide>
      ...
    </Swiper>
    <div
      v-if="venueListStatus === 'success'"
      class="mx-site-padding mb-site-padding"
    >
      <div
        class="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8"
      >
        <ItemCard
          v-for="venue in venueList"
          :key="venue.id"
          class="mt-site-padding hover:cursor-pointer"
          @click="() => itemCardOnClick(venue.id)"
          :event-categories="venue.eventCategories"
          :title="venue.title"
          :location="venue.location"
          :image-src="venue.image"
          :price-range="venue.priceRange"
        />
      </div>
    </div>
    <HomeSkeleton v-else-if="venueListStatus === 'loading'"></HomeSkeleton>
    <div
      v-else
      class="mx-14 mt-[50%] flex flex-col justify-center items-center"
    >
      <div class="w-[15rem]">
        <p class="text-center mb-5 font-semibold text-lg">
          Oops, something went wrong when retrieving data
        </p>
        <Button class="w-full" @click="refetchVenueList">Refresh</Button>
      </div>
    </div>
  </div>
</template>
