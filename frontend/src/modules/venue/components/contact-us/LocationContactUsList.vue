<script setup lang="ts">
import { facebookSVG, instagramSVG, tiktokSVG } from "@/assets/images/icons"
import LocationContactUsListItem from "@/modules/venue/components/contact-us/LocationContactUsListItem.vue"

defineProps<{
  contactUsInfo: {
    phoneNum: string
    website: string
    socialMedia: Array<{ type: string; link: string }>
  }
  address: string
}>()

const socialMediaIconsMap = new Map([
  ["facebook", facebookSVG],
  ["instagram", instagramSVG],
  ["tiktok", tiktokSVG],
])
</script>

<template>
  <div>
    <ul>
      <LocationContactUsListItem title="Address">
        <p>{{ address }}</p>
      </LocationContactUsListItem>
      <LocationContactUsListItem title="Phone Number">
        <a
          alt="phone number"
          class="text-primary-normal"
          :href="`tel:${contactUsInfo.phoneNum}`"
        >
          {{ contactUsInfo.phoneNum }}
        </a>
      </LocationContactUsListItem>
      <LocationContactUsListItem title="Website">
        <a
          alt="website link"
          class="text-primary-normal"
          :href="contactUsInfo.website"
          target="_blank"
        >
          {{ contactUsInfo.website }}
        </a>
      </LocationContactUsListItem>
      <LocationContactUsListItem title="Social Media">
        <ul class="flex">
          <li
            v-for="socialMedia in contactUsInfo.socialMedia"
            :key="socialMedia.type"
            class="mr-5"
          >
            <a
              :alt="`go to location ${socialMedia.type}`"
              :href="socialMedia.link"
              target="_blank"
            >
              <img
                :alt="`${socialMedia.type} icon`"
                :src="socialMediaIconsMap.get(socialMedia.type)"
                class="w-6 h-6 mt-2"
              />
            </a>
          </li>
        </ul>
      </LocationContactUsListItem>
    </ul>
  </div>
</template>
