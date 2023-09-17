<script setup lang="ts">
defineProps<{
  labelText?: string
  topRightLabel?: string
  bottomLeftLabel?: string
  bottomRightLabel?: string
  errorMessage?: string
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
    <input
      :class="`input input-bordered ${
        errorMessage ? 'input-error' : ''
      } w-full mb-0`"
      v-bind="$attrs"
    />
    <label v-if="bottomRightLabel || bottomLeftLabel" class="label">
      <span v-if="bottomLeftLabel" class="label-text-alt">{{
        bottomLeftLabel
      }}</span>
      <span v-if="bottomRightLabel" class="label-text-alt"
        >{{ bottomRightLabel }}
      </span>
    </label>
    <div>
      <span v-if="errorMessage" class="text-red-500">{{ errorMessage }}</span>
    </div>
  </div>
</template>
