<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  price: number;
}>();

const currency = "RM";
//return 2 decimal places if number has decimals, return whole number if no decimals
const computedPrice = computed(() => {
  const outputNum = Math.round(props.price * 100) / 100;
  if (outputNum % 1 !== 0) {
    return outputNum.toFixed(2);
  }
  return outputNum;
});
</script>

<template>{{ currency }} {{ computedPrice }}</template>
