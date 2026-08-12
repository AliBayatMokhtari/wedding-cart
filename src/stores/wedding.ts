import { defineStore } from 'pinia'
import { reactive } from 'vue'

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

  return { couple }
})
