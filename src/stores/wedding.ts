import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export type RsvpResponse = 'accepted' | 'declined' | null

export interface RsvpEntry {
  id: string
  response: RsvpResponse
  message: string
  createdAt: number
}

export const useWeddingStore = defineStore('wedding', () => {
  const couple = reactive({
    partnerOne: 'Ali',
    partnerTwo: 'Mahtab',
    displayName: 'Ali & Mahtab',
    tagline: 'Two hearts. One story. Forever.',
    longMessage:
      'After years of friendship, laughter, and quietly choosing each other every day, we are overjoyed to begin our next chapter together. We would be honoured to have you beside us as we say "I do".',
    photoOne: '/photos/photo-1.jpg.svg',
    photoTwo: '/photos/photo-2.jpg.svg',
    date: 'Saturday, 12 September 2026',
    ceremonyTime: '5:00 in the evening',
    receptionTime: '7:30 in the evening',
    venue: 'The Rosewood Conservatory',
    address: '14 Willow Lane, Lisbon, Portugal',
    quote:
      '"And over all these virtues put on love, which binds them all together in perfect unity."',
    quoteSource: '— Colossians 3:14',
  })

  const rsvps = ref<RsvpEntry[]>([])
  const submitted = ref(false)
  const lastResponse = ref<RsvpResponse>(null)

  function addRsvp(entry: Omit<RsvpEntry, 'id' | 'createdAt'>) {
    const newEntry: RsvpEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Date.now(),
    }
    rsvps.value = [newEntry, ...rsvps.value]
    lastResponse.value = entry.response
    submitted.value = true
    return newEntry
  }

  function resetSubmission() {
    submitted.value = false
    lastResponse.value = null
  }

  return {
    couple,
    rsvps,
    submitted,
    lastResponse,
    addRsvp,
    resetSubmission,
  }
})
