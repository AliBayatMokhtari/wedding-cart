import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import {
  ApiRequestError,
  getGuest,
  submitRsvp as submitRsvpRequest,
  type Guest,
} from '@/api/wedding'

export type RsvpResponse = 'accepted' | 'declined' | null

export const useWeddingStore = defineStore('wedding', () => {
  const couple = reactive({
    partnerOne: 'Mahtab',
    partnerTwo: 'Ali',
    tagline: 'Two hearts. One story. Forever.',
    longMessage:
      'After years of friendship, laughter, and quietly choosing each other every day, we are overjoyed to begin our next chapter together. We would be honoured to have you beside us as we say "I do".',
    photoOne: '/photos/photo-1.jpg.svg',
    photoTwo: '/photos/photo-2.jpg.svg',
    date: 'Tuesday, 01 August 2026',
    ceremonyTime: '6:00 in the evening',
    receptionTime: '7:30 in the evening',
    venue: 'Takhte Jamshid Palace',
    address: 'Shandiz, Mashhad',
    quote:
      '"And over all these virtues put on love, which binds them all together in perfect unity."',
    quoteSource: '— Colossians 3:14',
  })

  const guest = ref<Guest | null>(null)
  const loading = ref(false)
  const submitting = ref(false)
  const loadError = ref<string | null>(null)
  const submitError = ref<string | null>(null)

  async function loadGuest(hashId: string) {
    loading.value = true
    loadError.value = null
    guest.value = null
    try {
      guest.value = await getGuest(hashId)
    } catch (err) {
      loadError.value =
        err instanceof ApiRequestError && err.status === 404
          ? 'We could not find your invitation.'
          : err instanceof Error
            ? err.message
            : 'Something went wrong while loading your invitation.'
    } finally {
      loading.value = false
    }
  }

  async function submitRsvp(payload: { accepted: boolean; message: string }) {
    if (!guest.value) return
    submitting.value = true
    submitError.value = null
    try {
      const updated = await submitRsvpRequest(guest.value.hashId, {
        accepted: payload.accepted,
        message: payload.message || null,
      })
      guest.value = updated
    } catch (err) {
      if (err instanceof ApiRequestError && err.status === 409 && guest.value) {
        // Server says already submitted — refetch to surface the canonical state.
        await loadGuest(guest.value.hashId)
      }
      submitError.value =
        err instanceof Error ? err.message : 'Could not send your reply. Please try again.'
      throw err
    } finally {
      submitting.value = false
    }
  }

  return {
    couple,
    guest,
    loading,
    submitting,
    loadError,
    submitError,
    loadGuest,
    submitRsvp,
  }
})
