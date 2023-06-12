<script setup lang="ts">
import Navbar from "@/modules/common/components/shared-ui/organism/Navbar.vue"
import { Locale } from "vant"
import enUS from "vant/es/locale/lang/en-US"
Locale.use("en-US", enUS)
</script>

<template>
  <main>
    <Navbar />
    <RouterView />
  </main>
</template>
