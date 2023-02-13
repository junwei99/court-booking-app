<script setup lang="ts">
import { Swipe, SwipeItem } from "vant"

defineProps<{
  imageList: Array<string>
}>()
</script>

<template>
  <!-- mobile carousel for images -->
  <Swipe :height="240" class="sm:hidden">
    <SwipeItem
      v-for="image in imageList"
      :key="image"
      class="overflow-hidden relative h-full w-full"
    >
      <img
        class="absolute object-cover w-full h-full"
        :src="image"
        alt="test"
      />
    </SwipeItem>
    <template #indicator="{ active, total }">
      <div
        class="absolute right-2 bottom-2 px-[5px] py-[2px] text-white bg-black/50"
      >
        {{ active + 1 }}/{{ total }}
      </div>
    </template>
  </Swipe>

  <!-- desktop carousel for images -->
  <div
    class="hidden h-[25rem] sm:grid w-full gap-5 mt-10 grid-flow-col grid-rows-[repeat(2,auto)] rounded-xl overflow-hidden mb-12"
  >
    <div
      v-for="imgIndex in [0, 1, 2, 3, 4]"
      :key="imgIndex"
      :class="`bg-black h-full w-full overflow-hidden relative cursor-pointer ${
        imgIndex === 0 && 'row-span-2 col-span-2'
      } `"
    >
      <img
        class="absolute object-cover w-full h-full imageContainer"
        :src="imageList[imgIndex]"
      />
      <button
        v-if="imgIndex === 4"
        class="btn absolute text-xs bg-white text-black right-5 bottom-5 z-10 p-2 rounded-xl font-semibold flex hover:bg-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 mr-2"
        >
          <path
            fill-rule="evenodd"
            d="M15 3.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V5.56l-3.97 3.97a.75.75 0 11-1.06-1.06l3.97-3.97h-2.69a.75.75 0 01-.75-.75zm-12 0A.75.75 0 013.75 3h4.5a.75.75 0 010 1.5H5.56l3.97 3.97a.75.75 0 01-1.06 1.06L4.5 5.56v2.69a.75.75 0 01-1.5 0v-4.5zm11.47 11.78a.75.75 0 111.06-1.06l3.97 3.97v-2.69a.75.75 0 011.5 0v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5h2.69l-3.97-3.97zm-4.94-1.06a.75.75 0 010 1.06L5.56 19.5h2.69a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0v2.69l3.97-3.97a.75.75 0 011.06 0z"
            clip-rule="evenodd"
          />
        </svg>

        Show all photos
      </button>
    </div>
  </div>
</template>

<style>
.imageContainer:hover {
  filter: brightness(70%);
  transition: all 0.5s ease 0s;
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
}
</style>
