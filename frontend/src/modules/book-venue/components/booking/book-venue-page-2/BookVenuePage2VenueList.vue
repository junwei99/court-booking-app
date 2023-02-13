<script setup lang="ts">
import type { EFetchStatus } from "@/others/constants/enums"
import OutlinedButton from "@/modules/common/components/shared-ui/atom/OutlinedButton.vue"
import PriceCurrency from "@/modules/common/components/shared-ui/atom/PriceCurrency.vue"
import type { IEventUnitItem } from "@/modules/common/types/venue.types"

defineProps<{
  venueFetchStatus: EFetchStatus
  availableEventUnitList: Array<IEventUnitItem>
  bookingDatetime: Date
  handleMutateCartItems: (eventUnit: IEventUnitItem) => void
  hasItem: (eventUnitId: number) => boolean
}>()
</script>

<template>
  <div>
    <div
      v-for="eventUnit in availableEventUnitList"
      :key="eventUnit.eventUnitId"
      class="flex justify-between rounded-xl border-[1px] border-gray-300 my-2 p-3 items-center"
    >
      <div>
        <p class="font-semibold">{{ eventUnit.venueName }}</p>
        <p>{{ eventUnit.eventCategoryName }}</p>
        <p><PriceCurrency :price="eventUnit.price" /></p>
      </div>
      <OutlinedButton
        class="min-w-[9rem]"
        @click="handleMutateCartItems(eventUnit)"
        :selected="hasItem(eventUnit.eventUnitId)"
      >
        {{ hasItem(eventUnit.eventUnitId) ? "Added to cart" : "Add to cart" }}
      </OutlinedButton>
    </div>
  </div>
</template>
