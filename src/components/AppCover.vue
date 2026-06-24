<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useWeddingStore } from '@/stores/wedding'
import { useReveal } from '@/composables/useReveal'
import WreathDecoration from '@/components/WreathDecoration.vue'
import Ampersand from '@/components/Ampersand.vue'

const store = useWeddingStore()
const root = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const subtitle = ref<HTMLElement | null>(null)
const date = ref<HTMLElement | null>(null)
const cue = ref<HTMLElement | null>(null)

onMounted(() => {
  // Stagger the entrance of the cover elements for a romantic reveal
  const sequence = [title.value, subtitle.value, date.value, cue.value]
  sequence.forEach((el, i) => {
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(18px)'
    el.style.transition = 'opacity 1.2s ease, transform 1.2s ease'
    setTimeout(
      () => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      },
      200 + i * 350,
    )
  })
})

useReveal(root)
</script>

<template>
  <section
    ref="root"
    class="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 py-20"
    aria-label="Wedding invitation cover"
  >
    <WreathDecoration />

    <div class="relative z-10 max-w-md mx-auto flex flex-col items-center">
      <p ref="title" class="eyebrow mb-6">Together with their families</p>

      <h1 class="font-display text-[clamp(3.4rem,14vw,5.2rem)] leading-[1.05] text-rose-500">
        <span class="block">{{ store.couple.partnerOne }}</span>
        <Ampersand class="block my-1 font-display text-champagne-400 text-[0.65em]" />
        <span class="block">{{ store.couple.partnerTwo }}</span>
      </h1>

      <p ref="subtitle" class="mt-8 font-serif italic text-[1.05rem] text-ink-soft max-w-xs">
        {{ store.couple.tagline }}
      </p>

      <div ref="date" class="mt-10 flex flex-col items-center gap-2">
        <span class="h-px w-14 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p class="font-serif text-[1.05rem] tracking-wide text-ink">
          {{ store.couple.date }}
        </p>
        <span class="h-px w-14 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p class="eyebrow mt-2">{{ store.couple.venue }}</p>
        <p class="font-serif text-[0.85rem] text-ink-soft">
          {{ store.couple.address }}
        </p>
      </div>

      <a
        ref="cue"
        href="#story"
        class="mt-14 inline-flex flex-col items-center gap-1 text-champagne-400 hover:text-rose-400 transition-colors"
        aria-label="Scroll to read more"
      >
        <span class="font-serif italic text-[0.95rem]">Open the invitation</span>
        <span class="i-mdi-chevron-down text-2xl animate-bounce" aria-hidden="true" />
      </a>
    </div>
  </section>
</template>
