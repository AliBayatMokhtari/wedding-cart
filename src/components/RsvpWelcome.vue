<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <p class="mt-6 text-center font-serif text-[1.05rem] text-ink">
    Welcome,
    <span class="text-rose-500">{{ name }}</span>
  </p>
</template>
