<script setup lang="ts">
import { computed } from 'vue'
import type { Guest } from '@/api/wedding'

const props = defineProps<{
  guest: Guest
}>()

const isAccepted = computed(() => props.guest.rsvp?.accepted === true)
</script>

<template>
  <div
    class="mt-10 mx-auto max-w-md rounded-3xl bg-gradient-to-br from-rose-50 to-champagne-100 p-8 sm:p-10 text-center shadow-elev ring-1 ring-rose-100"
  >
    <div
      class="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-rose-500 text-white shadow-soft"
      aria-hidden="true"
    >
      <span :class="isAccepted ? 'i-mdi-check text-3xl' : 'i-mdi-heart text-3xl'" />
    </div>
    <p class="eyebrow mt-3">{{ isAccepted ? 'Reply received' : 'Noted with love' }}</p>
    <h3 class="mt-6 font-display text-[2.2rem] text-rose-500 leading-tight">
      Thank you, {{ guest.name }}
    </h3>
    <p class="mt-3 font-serif text-ink-soft">
      <template v-if="isAccepted">
        We can't wait to celebrate with you. Your spot is saved with love.
      </template>
      <template v-else>
        You'll be missed. Thank you for letting us know — we'll save a piece of cake for you in
        spirit.
      </template>
    </p>
  </div>
</template>
