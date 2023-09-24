<script setup lang="ts">
import OutlinedButton from "./OutlinedButton.vue"

defineProps<{ show: boolean; title: string; buttonText?: string }>()

const emit = defineEmits<{
  (e: "cta-action"): void
}>()

const handleCTAClicked = () => {
  emit("cta-action")
}
</script>

<template>
  <!-- Put this part before </body> tag -->
  <input type="checkbox" id="modal" class="modal-toggle" :checked="show" />
  <div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 class="font-bold text-lg pb-4">{{ title }}</h3>
      <slot></slot>
      <div class="modal-action">
        <OutlinedButton @click="handleCTAClicked">{{
          buttonText ?? "Close"
        }}</OutlinedButton>
      </div>
    </div>
  </div>
</template>
