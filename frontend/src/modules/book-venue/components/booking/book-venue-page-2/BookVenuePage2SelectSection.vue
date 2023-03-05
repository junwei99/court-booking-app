<script setup lang="ts">
import type { TSelectTimeMap } from "@/modules/book-venue/types/components"
import type { TTimeAndDurationKey } from "@/modules/book-venue/types/stores/book-venue-store.types"

defineProps<{
  selectItemsMap: TSelectTimeMap
  getSelectValue: (selectKey: TTimeAndDurationKey) => string
}>()

const emit = defineEmits<{
  (
    e: "handleSelectItemOnChange",
    selectKey: TTimeAndDurationKey,
    selectValue: string
  ): Promise<void>
}>()
</script>

<template>
  <div class="grid grid-cols-[2fr_1fr] gap-4 mb-5">
    <select
      v-for="[selectKey, selectItemValue] in selectItemsMap"
      :key="selectKey"
      :class="`select select-bordered select-md ${
        selectKey === 'selectedDuration' && 'col-start-1 col-end-3'
      } `"
      :value="getSelectValue(selectKey)"
      @change="(e: any) => emit('handleSelectItemOnChange', selectKey, e.target.value)"
    >
      <option
        class="text-base-300"
        v-for="(selectItem, index) in selectItemValue.list"
        :key="selectItem.text"
        :value="selectItem.value"
        :selected="index === 0"
        :disabled="selectItem.disabled"
      >
        {{ selectItem.text }}
      </option>
    </select>
  </div>
</template>
