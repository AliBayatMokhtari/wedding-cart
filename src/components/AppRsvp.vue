<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'
import RsvpForm from '@/components/RsvpForm.vue'
import RsvpSuccess from '@/components/RsvpSuccess.vue'
import { useWeddingStore } from '@/stores/wedding'

const store = useWeddingStore()
const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section id="rsvp" ref="root" class="section reveal" aria-label="RSVP">
    <div class="container">
      <div class="text-center">
        <p class="eyebrow">RSVP</p>
        <h2 class="mt-3 font-display text-[clamp(2.4rem,9vw,3.4rem)] text-rose-500 leading-tight">
          Will you join us?
        </h2>
        <p class="mt-4 font-serif italic text-ink-soft max-w-xs mx-auto">
          Kindly reply by the end of August so we can plan a beautiful day with you in mind.
        </p>
      </div>

      <RsvpSuccess v-if="store.submitted" :response="store.lastResponse!" />

      <RsvpForm v-else />
    </div>
  </section>
</template>
