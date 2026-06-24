<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: 'muted' | 'danger'
  }>(),
  { tone: 'muted' },
)
</script>

<template>
  <p
    class="mt-10 mx-auto max-w-md rounded-3xl bg-white/80 ring-1 p-6 sm:p-8 text-center font-serif shadow-soft"
    :class="tone === 'danger' ? 'ring-rose-200 text-rose-500' : 'ring-rose-100 text-ink-soft'"
    :role="tone === 'danger' ? 'alert' : undefined"
  >
    <slot />
  </p>
</template>
