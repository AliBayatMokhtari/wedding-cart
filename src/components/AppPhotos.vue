<script setup lang="ts">
import { ref } from 'vue'
import { useWeddingStore } from '@/stores/wedding'
import { useReveal } from '@/composables/useReveal'
import PhotoFrame from '@/components/PhotoFrame.vue'

const store = useWeddingStore()
const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section id="photos" ref="root" class="section reveal" aria-label="Photos of the couple">
    <div class="container">
      <div class="text-center">
        <p class="eyebrow">Moments</p>
        <h2 class="mt-3 font-display text-[clamp(2.4rem,9vw,3.4rem)] text-rose-500 leading-tight">
          A glimpse of us
        </h2>
        <p class="mt-4 font-serif italic text-ink-soft max-w-xs mx-auto">
          A few of our favourite frames, leading up to forever.
        </p>
      </div>

      <div class="mt-10 flex flex-col items-center gap-6 sm:gap-8">
        <PhotoFrame :src="store.couple.photoOne" :alt="store.couple.partnerOne" tone="champagne" />

        <span aria-hidden="true" class="i-mdi-heart text-rose-400 text-3xl animate-pulse" />

        <PhotoFrame :src="store.couple.photoTwo" :alt="store.couple.partnerTwo" />
      </div>
    </div>
  </section>
</template>
