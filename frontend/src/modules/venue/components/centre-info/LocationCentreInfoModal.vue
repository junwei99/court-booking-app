<script setup lang="ts">
import { ECentreInfoKey } from "@/others/constants/enums"
import centreLayoutImg from "@/assets/images/centre-layout.webp"
import Modal from "@/modules/common/components/shared-ui/atom/Modal.vue"
defineProps<{
  centreInfoModalState: { modalId: ECentreInfoKey }
  centreInfoItemMap: Map<ECentreInfoKey, { title: string }>
}>()
const emit = defineEmits<{
  (e: "closeCentreInfoModal"): void
}>()
</script>

<template>
  <Modal
    :show="!!centreInfoModalState.modalId"
    :title="centreInfoItemMap.get(centreInfoModalState.modalId)?.title ?? ''"
    @closeModal="() => emit('closeCentreInfoModal')"
  >
    <div v-if="centreInfoModalState.modalId === ECentreInfoKey.OPENING_HOURS">
      Daily: 8:00AM - 2:00AM
    </div>
    <div v-else-if="centreInfoModalState.modalId === ECentreInfoKey.PRICING">
      <h3 class="font-semibold">Badminton (Standard)</h3>
      <p class="mt-2">Monday to Friday</p>
      <p class="mt-2">
        08:00 - 18:00 : RM 20 per hour <br />
        18:00 - 01:00 : RM 30 per hour <br />
        01:00 - 02:00 : RM 20 per hour <br />
      </p>
      <p class="mt-2">Saturday & Sunday</p>
      <p class="mt-2">
        08:00 - 01:00 : RM 24 per hour <br />
        01:00 - 02:00 : RM 20 per hour <br />
      </p>
      <p class="mt-2">Public Holiday</p>
      <p class="mt-2">
        08:00 - 18:00 : RM 24 per hour <br />
        18:00 - 01:00 : RM 30 per hour <br />
        01:00 - 02:00 : RM 20 per hour
      </p>
    </div>
    <div v-else-if="centreInfoModalState.modalId === ECentreInfoKey.LAYOUT">
      <img :src="centreLayoutImg" alt="centre layout" />
    </div>
    <div v-else>
      <h3>Booking refund & changes</h3>
      <ol class="mt-2">
        <li>1. Strictly no refund or carry forward of non-utilised session.</li>
        <li>
          2. Two days' advance notice must be given for any change of booking
          time. Any request to change booking time is subject to court
          availability.
        </li>
      </ol>
      <h3 class="mt-2">Others</h3>
      <ol>
        <li>
          1. Please do not leave your valuables unattended. We will not be
          responsible for any theft.
        </li>
      </ol>
    </div>
  </Modal>
</template>
