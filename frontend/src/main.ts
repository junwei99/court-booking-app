import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

import "@/assets/main.css"
import "v-calendar/dist/style.css"
// import VCalendar from "v-calendar";
import SetupCalendar from "v-calendar"
import { VueQueryPlugin } from "@tanstack/vue-query"
import "vant/lib/index.css"

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(VueQueryPlugin)
app.use(SetupCalendar, {})
// app.useipe)
// app.use(SwipeItem)

app.mount("#app")
