<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"
import type { Swiper as SwiperClass } from "swiper/types"

const skeletonNavList = Array.from(Array(9).keys())
const skeletonItemCardList = Array.from(Array(20).keys())
</script>

<template>
  <!-- <Swiper class="mt-2" :slides-per-view="4" :space-between="5">
    <SwiperSlide v-for="navItem in skeletonNavList" :key="navItem"
      ><div class="flex flex-col items-center w-full mx-site-padding">
        <div class="skeleton-pulse rounded-full h-[4rem] w-[4rem]" />
        <div class="skeleton-pulse h-4 w-[4.7rem] mt-2" /></div
    ></SwiperSlide>
    ...
  </Swiper> -->
  <div class="mx-site-padding mb-site-padding">
    <template
      v-for="skeletonItemCard in skeletonItemCardList"
      :key="skeletonItemCard"
    >
      <div
        class="skeleton-pulse aspect-square w-full rounded-xl mt-site-padding"
      />
      <div class="skeleton-pulse h-5 w-[5rem] mt-3" />
      <div class="skeleton-pulse h-4 w-[15rem] mt-2" />
      <div class="skeleton-pulse h-4 w-[20rem] mt-2" />
      <div class="skeleton-pulse h-4 w-[8rem] mt-2" />
    </template>
  </div>
</template>
