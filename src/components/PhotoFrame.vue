<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    alt: string
    tone?: 'rose' | 'champagne'
  }>(),
  { tone: 'rose' },
)
</script>

<template>
  <figure
    class="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-[1.75rem] p-2 shadow-elev"
    :class="
      tone === 'champagne'
        ? 'bg-gradient-to-br from-champagne-200 via-rose-100 to-champagne-200'
        : 'bg-gradient-to-br from-rose-100 via-champagne-100 to-rose-100'
    "
  >
    <div class="relative w-full h-full rounded-[1.4rem] overflow-hidden ring-1 ring-gold/30">
      <img :src="src" :alt="alt" class="w-full h-full object-cover" loading="lazy" />
    </div>
    <span
      aria-hidden="true"
      class="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gold-soft shadow-soft"
    />
    <span
      aria-hidden="true"
      class="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-gold-soft shadow-soft"
    />
  </figure>
</template>
