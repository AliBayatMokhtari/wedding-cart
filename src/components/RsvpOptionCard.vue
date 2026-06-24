<script setup lang="ts">
defineProps<{
  selected: boolean
  label: string
  helper: string
  icon: string
  tone: 'accept' | 'decline'
}>()

defineEmits<{
  (e: 'select'): void
}>()
</script>

<template>
  <button
    type="button"
    class="group rounded-2xl px-4 py-4 text-left bg-white/80 ring-2 transition-[background-color,box-shadow,transform,ring-color] duration-200 ease-out focus:outline-none"
    :class="[
      tone === 'accept'
        ? 'focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white'
        : 'focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-white',
      selected
        ? tone === 'accept'
          ? 'ring-rose-400 bg-rose-50 shadow-soft'
          : 'ring-ink bg-ink/5 shadow-soft'
        : 'ring-rose-100 hover:ring-rose-300 hover:bg-rose-50',
    ]"
    :aria-pressed="selected"
    @click="$emit('select')"
  >
    <div class="flex items-center gap-3">
      <span
        class="flex items-center justify-center w-9 h-9 rounded-full transition-colors"
        :class="
          selected
            ? tone === 'accept'
              ? 'bg-rose-500 text-white'
              : 'bg-ink text-white'
            : 'bg-rose-50 text-rose-400 group-hover:bg-rose-100'
        "
      >
        <span :class="[icon, 'text-xl']" aria-hidden="true" />
      </span>
      <span class="font-serif text-[1.05rem] text-ink">{{ label }}</span>
    </div>
    <p class="mt-2 text-[0.85rem] text-ink-soft">{{ helper }}</p>
  </button>
</template>
