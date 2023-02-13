<script setup lang="ts">
import { chevronRightSVG } from "@/assets/images/icons";
defineProps<{ title: string }>();
</script>

<template>
  <button class="w-full" v-bind="$attrs">
    <div class="w-full flex justify-between items-center">
      <h3 class="font-normal mb-1">{{ title }}</h3>
      <img
        class="h-5 w-5"
        alt="open centre information popup"
        :src="chevronRightSVG"
      />
    </div>
  </button>
</template>
