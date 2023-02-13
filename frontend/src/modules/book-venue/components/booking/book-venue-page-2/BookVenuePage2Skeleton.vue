<template>
  <div>
    <div
      v-for="skeletonItem in [1, 2, 3, 4]"
      :key="skeletonItem"
      class="animate-pulse h-[6rem] w-full bg-gray-300 rounded-xl my-2"
    ></div>
  </div>
</template>
