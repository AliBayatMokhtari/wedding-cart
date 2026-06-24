<script setup lang="ts">
import { ref } from 'vue'
import { useWeddingStore } from '@/stores/wedding'
import { useReveal } from '@/composables/useReveal'
import FloralAccent from '@/components/FloralAccent.vue'
import Ampersand from './Ampersand.vue'

const store = useWeddingStore()
const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section id="story" ref="root" class="section reveal" aria-label="Our story">
    <div class="container text-center">
      <p class="eyebrow">Our Story</p>
      <h2 class="mt-3 font-display text-[clamp(2.4rem,9vw,3.4rem)] text-rose-500 leading-tight">
        A little love letter
      </h2>

      <div class="mt-8 flex justify-center">
        <FloralAccent class="text-3xl text-gold-soft" />
      </div>

      <p class="mt-8 font-serif text-[1.15rem] leading-relaxed text-ink-soft">
        {{ store.couple.longMessage }}
      </p>

      <p class="mt-10 font-display text-[1.6rem] text-rose-400">With love,</p>
      <p class="mt-1 font-serif text-[1.15rem] text-ink">
        {{ store.couple.partnerOne }}
        <Ampersand />
        {{ store.couple.partnerTwo }}
      </p>
    </div>
  </section>
</template>
