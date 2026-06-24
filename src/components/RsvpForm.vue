<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useWeddingStore, type RsvpResponse } from '@/stores/wedding'
import RsvpOptionCard from '@/components/RsvpOptionCard.vue'

const store = useWeddingStore()

const form = reactive({
  response: null as RsvpResponse,
  message: '',
})

const localError = ref('')

const canSubmit = computed(() => form.response !== null && !store.submitting)

async function submit() {
  localError.value = ''
  if (!form.response) {
    localError.value = 'Please let us know if you can make it.'
    return
  }

  try {
    await store.submitRsvp({
      accepted: form.response === 'accepted',
      message: form.message.trim(),
    })
  } catch {
    // store.submitError is already set; nothing else to do here.
  }
}
</script>

<template>
  <form
    class="mt-10 mx-auto max-w-md rounded-3xl bg-white/80 ring-1 ring-rose-100 p-6 sm:p-8 shadow-soft"
    @submit.prevent="submit"
    novalidate
  >
    <fieldset>
      <legend class="eyebrow mb-3">Will you be there?</legend>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <RsvpOptionCard
          :selected="form.response === 'accepted'"
          tone="accept"
          icon="i-mdi-check"
          label="Joyfully accepts"
          helper="Save me a seat at the celebration."
          @select="form.response = 'accepted'"
        />
        <RsvpOptionCard
          :selected="form.response === 'declined'"
          tone="decline"
          icon="i-mdi-close"
          label="Can't attend"
          helper="Can't be there, but sending love."
          @select="form.response = 'declined'"
        />
      </div>
    </fieldset>

    <label class="block mt-7">
      <span class="eyebrow">A note for the couple (optional)</span>
      <textarea
        v-model="form.message"
        class="input-base mt-2 min-h-[110px] resize-y"
        placeholder="Share a wish, a memory, or just hello..."
        maxlength="1000"
      />
      <span class="mt-1 block text-right text-[0.75rem] text-ink-muted">
        {{ form.message.length }} / 1000
      </span>
    </label>

    <p
      v-if="localError || store.submitError"
      class="mt-3 text-[0.85rem] text-rose-500"
      role="alert"
    >
      {{ localError || store.submitError }}
    </p>

    <button type="submit" class="btn-cta" :disabled="!canSubmit" :aria-disabled="!canSubmit">
      <span v-if="store.submitting" class="i-mdi-loading text-xl animate-spin" aria-hidden="true" />
      <span v-else class="i-mdi-heart text-xl" aria-hidden="true" />
      <span>{{ store.submitting ? 'Sending...' : 'Send my reply' }}</span>
    </button>
  </form>
</template>
