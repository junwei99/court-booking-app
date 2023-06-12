<script setup lang="ts">
defineProps<{
  labelText?: string
  topRightLabel?: string
  bottomLeftLabel?: string
  bottomRightLabel?: string
}>()
</script>

<template>
  <div class="form-control w-full">
    <label v-if="labelText || topRightLabel" class="label">
      <span v-if="labelText" class="label-text">{{ labelText }}</span>
      <span v-if="topRightLabel" class="label-text-alt">{{
        topRightLabel
      }}</span>
    </label>
    <input class="input input-bordered w-full" v-bind="$attrs" />
    <label v-if="bottomRightLabel || bottomRightLabel" class="label">
      <span v-if="bottomLeftLabel" class="label-text-alt">{{
        bottomLeftLabel
      }}</span>
      <span v-if="bottomRightLabel" class="label-text-alt"
        >{{ bottomRightLabel }}
      </span>
    </label>
  </div>
</template>
