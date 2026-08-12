<script setup lang="ts">
import { useWeddingStore } from '@/stores/wedding'
import FloralAccent from '@/components/FloralAccent.vue'
import Ampersand from '@/components/Ampersand.vue'

const store = useWeddingStore()
</script>

<template>
  <footer class="relative py-10 px-6 text-center" aria-label="Wedding footer">
    <p class="mt-6 font-display text-[2rem] text-rose-500 leading-none">
      {{ store.couple.partnerOne }}
      <Ampersand class="text-champagne-400 mx-1" />
      {{ store.couple.partnerTwo }}
    </p>

    <p class="mt-2 font-serif italic text-ink-soft">
      {{ store.couple.date }}
    </p>

    <p class="mt-8 text-[0.75rem] text-ink-muted tracking-wider uppercase">
      Made with love · Forever & always
    </p>
  </footer>
</template>
