<script setup lang="ts">
import { ref } from 'vue'
import { useWeddingStore } from '@/stores/wedding'
import { useReveal } from '@/composables/useReveal'
import Ampersand from '@/components/Ampersand.vue'
import DetailCard from '@/components/DetailCard.vue'

const store = useWeddingStore()
const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section id="details" ref="root" class="section reveal" aria-label="Wedding details">
    <div class="container text-center">
      <p class="eyebrow">The Day</p>
      <h2 class="mt-3 font-display text-[clamp(2.4rem,9vw,3.4rem)] text-rose-500 leading-tight">
        Save the date
      </h2>

      <!-- Decorative double-frame card -->
      <div
        class="relative mt-10 mx-auto max-w-sm rounded-3xl bg-gradient-to-br from-rose-50 to-champagne-100 p-8 shadow-soft"
      >
        <div aria-hidden="true" class="absolute inset-2 rounded-2xl border border-gold/40" />
        <div aria-hidden="true" class="absolute inset-4 rounded-xl border border-rose-200/70" />

        <div class="relative">
          <span class="i-mdi-calendar-blank-outline text-3xl text-rose-400" aria-hidden="true" />
          <p class="mt-3 font-serif text-[1.4rem] text-ink leading-snug">
            {{ store.couple.date }}
          </p>
          <div class="my-5 flex items-center justify-center gap-3">
            <span class="h-px w-10 bg-gold/60" />
            <span class="i-mdi-star-four-points text-gold" aria-hidden="true" />
            <span class="h-px w-10 bg-gold/60" />
          </div>
          <p class="font-display text-[2rem] text-rose-500 leading-none">
            {{ store.couple.partnerOne }}
            <Ampersand class="text-champagne-400" />
            {{ store.couple.partnerTwo }}
          </p>
        </div>
      </div>

      <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
        <DetailCard icon="i-mdi-clock-outline" label="Ceremony">
          {{ store.couple.ceremonyTime }}
        </DetailCard>
        <DetailCard icon="i-mdi-clock-outline" label="Reception">
          {{ store.couple.receptionTime }}
        </DetailCard>
        <DetailCard icon="i-mdi-map-marker-outline" label="Venue">
          {{ store.couple.venue }}
          <template #description>
            {{ store.couple.address }}
          </template>
        </DetailCard>
      </div>

      <p class="mt-12 font-serif italic text-[1rem] text-ink-soft">
        {{ store.couple.quote }}
      </p>
      <p class="eyebrow mt-2">{{ store.couple.quoteSource }}</p>
    </div>
  </section>
</template>
