<script setup lang="ts">
import Modal from "@/modules/common/components/shared-ui/atom/Modal.vue"
import Navbar from "@/modules/common/components/shared-ui/organism/Navbar.vue"
import { useGlobalLayoutStore } from "@/modules/common/stores/global-layout.store"
import { storeToRefs } from "pinia"
import { Locale } from "vant"
import enUS from "vant/es/locale/lang/en-US"
Locale.use("en-US", enUS)

const globalLayoutStore = useGlobalLayoutStore()
const { modal } = storeToRefs(globalLayoutStore)

const handleCTAAction = () => {
  if (modal.value.ctaCallback) {
    modal.value.ctaCallback()
  }

  globalLayoutStore.resetModalState()
}
</script>

<template>
  <main>
    <Navbar />
    <RouterView />
    <Modal
      :show="modal.show"
      :title="modal.title"
      :button-text="modal.buttonText"
      @cta-action="handleCTAAction"
    />
  </main>
</template>
