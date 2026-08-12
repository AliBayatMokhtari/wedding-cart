<script setup lang="ts">
import AppCover from '@/components/AppCover.vue'
import AppPhotos from '@/components/AppPhotos.vue'
import AppStory from '@/components/AppStory.vue'
import AppDetails from '@/components/AppDetails.vue'
import AppFooter from '@/components/AppFooter.vue'
import FloralDivider from '@/components/FloralDivider.vue'
import FloralBackdrop from '@/components/FloralBackdrop.vue'
</script>

<template>
  <div class="relative w-full overflow-hidden">
    <FloralBackdrop />

    <main class="relative">
      <AppCover />

      <FloralDivider />

      <AppStory />

      <FloralDivider />

      <AppPhotos />

      <FloralDivider />

      <AppDetails />

      <FloralDivider />

      <AppFooter />
    </main>
  </div>
</template>