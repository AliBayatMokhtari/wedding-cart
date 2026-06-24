<script setup lang="ts">
import { useWeddingStore } from '@/stores/wedding'
import FloralAccent from '@/components/FloralAccent.vue'
import Ampersand from '@/components/Ampersand.vue'

const store = useWeddingStore()
</script>

<template>
  <footer class="relative pt-16 pb-10 px-6 text-center" aria-label="Wedding footer">
    <div class="flex items-center justify-center gap-3 text-rose-300">
      <span class="h-px w-10 bg-gradient-to-r from-transparent to-rose-200" />
      <FloralAccent class="text-xl" />
      <span class="h-px w-10 bg-gradient-to-l from-transparent to-rose-200" />
    </div>

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
