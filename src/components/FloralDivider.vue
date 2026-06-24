<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'
import FloralAccent from '@/components/FloralAccent.vue'
import Ampersand from '@/components/Ampersand.vue'

defineProps<{
  label?: string
}>()

const el = ref<HTMLElement | null>(null)
useReveal(el)
</script>

<template>
  <div ref="el" class="w-full flex items-center justify-center py-12 px-6 reveal">
    <div class="flex items-center gap-3 text-gold">
      <span class="h-px w-10 bg-gradient-to-r from-transparent to-gold/70" />
      <FloralAccent class="text-xl text-rose-300" />
      <span v-if="label" class="eyebrow text-champagne-400">{{ label }}</span>
      <Ampersand v-else class="font-display text-xl text-rose-300" />
      <FloralAccent class="text-xl text-rose-300 scale-x-[-1]" />
      <span class="h-px w-10 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  </div>
</template>
