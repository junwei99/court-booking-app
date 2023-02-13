<script setup lang="ts">
import { useSlots } from "vue";

defineProps<{
  title: string;
}>();

const slots = useSlots();
</script>

<template>
  <div
    tabindex="0"
    class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
  >
    <div class="collapse-title text-base font-semibold flex">
      <div class="mr-3" v-if="slots.titleIcon">
        <slot name="titleIcon"></slot>
      </div>
      {{ title }}
    </div>
    <div class="collapse-content">
      <slot name="collapseContent"></slot>
    </div>
  </div>
</template>
