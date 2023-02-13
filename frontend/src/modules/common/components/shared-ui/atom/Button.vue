<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    selected?: boolean;
    variant?: "contained" | "outlined";
  }>(),
  {
    selected: false,
    variant: "contained",
  }
);

const outlinedStyles = "btn-outline border-primary-normal";

const outlinedSelected = [
  props.selected
    ? "text-white border-primary-normal bg-primary-normal"
    : "text-primary-normal",
  "hover:text-white hover:border-primary-normal hover:bg-primary-normal",
].join(" ");

const containedStyles = "text-white bg-primary-normal border-primary-normal";

const containedSelected = [
  "",
  "hover:text-white hover:border-primary-light hover:bg-primary-light",
].join(" ");
</script>

<template>
  <button
    :class="
      [
        'btn',
        variant === 'outlined' && `${outlinedStyles} ${outlinedSelected}`,
        variant === 'contained' && `${containedStyles} ${containedSelected}`,
        ,
      ].join(' ')
    "
  >
    <slot></slot>
  </button>
</template>
