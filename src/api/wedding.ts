import { request } from '@/api/client'
import type { Guest } from '@/api/types'

export { ApiRequestError } from '@/api/client'
export type { Guest, GuestRsvp } from '@/api/types'

export function getGuest(hashId: string): Promise<Guest> {
  return request<Guest>(`/api/guests/${hashId}`)
}

export function submitRsvp(
  hashId: string,
  body: { accepted: boolean; message: string | null },
): Promise<Guest> {
  return request<Guest>(`/api/guests/${hashId}/rsvp`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
