<script setup lang="ts">
defineProps<{
  icon: string
  label: string
}>()
</script>

<template>
  <div class="rounded-2xl bg-white/70 ring-1 ring-rose-100 p-5 text-center shadow-soft">
    <span :class="[icon, 'text-2xl text-rose-400']" aria-hidden="true" />
    <p class="eyebrow mt-3">{{ label }}</p>
    <p class="mt-2 font-serif text-[1.05rem] text-ink">
      <slot />
    </p>
    <p v-if="$slots.description" class="mt-1 text-[0.85rem] text-ink-soft">
      <slot name="description" />
    </p>
  </div>
</template>
