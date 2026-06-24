export const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:3000'

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message)
    this.name = 'ApiRequestError'
  }
}

export interface ApiErrorBody {
  error: string
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init,
  })
  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const body = (await res.json()) as ApiErrorBody
      if (body?.error) message = body.error
    } catch {
      // body wasn't JSON; keep the generic status message
    }
    throw new ApiRequestError(message, res.status)
  }
  return (await res.json()) as T
}
