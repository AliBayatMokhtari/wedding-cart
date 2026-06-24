export interface GuestRsvp {
  accepted: boolean
  message: string | null
  submittedAt: string
}

export interface Guest {
  hashId: string
  name: string
  count: number
  rsvp: GuestRsvp | null
}
