<script setup lang="ts">
defineProps<{
  /** UnoCSS icon class, e.g. "i-mdi-flower-tulip" or "i-mdi-flower" */
  icon?: string
}>()
</script>

<template>
  <span :class="[icon ?? 'i-mdi-flower-tulip']" aria-hidden="true" />
</template>
