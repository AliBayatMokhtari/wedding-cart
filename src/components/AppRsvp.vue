<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useReveal } from '@/composables/useReveal'
import RsvpForm from '@/components/RsvpForm.vue'
import RsvpSuccess from '@/components/RsvpSuccess.vue'
import RsvpLoading from '@/components/RsvpLoading.vue'
import RsvpMessage from '@/components/RsvpMessage.vue'
import RsvpWelcome from '@/components/RsvpWelcome.vue'
import { useWeddingStore } from '@/stores/wedding'

const store = useWeddingStore()
const root = ref<HTMLElement | null>(null)
useReveal(root)

const guestName = computed(() => store.guest?.name ?? 'friend')

onMounted(() => {
  const hashId = new URLSearchParams(window.location.search).get('g')
  if (hashId) {
    void store.loadGuest(hashId)
  }
})
</script>

<template>
  <section id="rsvp" ref="root" class="section reveal" aria-label="RSVP">
    <div class="container">
      <div class="text-center">
        <p class="eyebrow">RSVP</p>
        <h2 class="mt-3 font-display text-[clamp(2.4rem,9vw,3.4rem)] text-rose-500 leading-tight">
          Will you join us?
        </h2>
        <p class="mt-4 font-serif italic text-ink-soft max-w-xs mx-auto">
          Kindly reply by the end of August so we can plan a beautiful day with you in mind.
        </p>
      </div>

      <RsvpWelcome v-if="store.guest" :name="guestName" />

      <RsvpMessage v-if="!store.loading && !store.guest && !store.loadError">
        Please use the personalised link from your invitation to open RSVP form.
      </RsvpMessage>

      <RsvpMessage v-if="store.loadError" tone="danger">
        {{ store.loadError }}
      </RsvpMessage>

      <RsvpLoading v-if="store.loading" />

      <RsvpSuccess v-else-if="store.guest?.rsvp" :guest="store.guest" />

      <RsvpForm v-else-if="store.guest" />
    </div>
  </section>
</template>
