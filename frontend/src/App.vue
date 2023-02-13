<script setup lang="ts">
// import { RouterLink, RouterView } from "vue-router";
import { Locale } from "vant"
import enUS from "vant/es/locale/lang/en-US"
Locale.use("en-US", enUS)
</script>

<template>
  <header>
    <!-- <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
    <!-- <GlobalNavbar /> -->
    <!-- <div class="bg-black sticky h-20 w-full z-20 top-0 md:top-0"></div> -->
  </header>
  <main>
    <!-- <GlobalNavbar /> -->
    <!-- <div class="bg-black sticky h-20 w-full z-20 top-0 md:top-0"></div> -->
    <RouterView />
  </main>
</template>
