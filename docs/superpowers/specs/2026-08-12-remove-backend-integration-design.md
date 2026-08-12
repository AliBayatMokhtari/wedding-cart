# Remove Backend Integration — Design

**Date:** 2026-08-12
**Status:** Approved
**Scope:** `wedding-client/` only

## Goal

Delete every trace of the backend from the wedding-client codebase and remove the RSVP feature entirely. After this change the client has no `fetch` calls, no API base URL configuration, no `api/` directory, and no RSVP section in the rendered page. Couples info (names, tagline, story, date, venue, address, photos, quote) remains hard-coded in the store and is rendered exactly as today.

## Non-goals

- The sibling `wedding-backend/` project at `/Users/alibm/Documents/tmp/wedding/wedding-backend/` is left untouched.
- No replacement static "RSVP via your invitation" placeholder block. The RSVP section is gone, not repurposed.
- No documentation rewrite. The README mentions no RSVP and `vite.config.ts` has no proxy config to remove.

## Files deleted (no replacements)

These files exist solely to support the RSVP network round-trip. After removal they have no consumers.

- `src/api/client.ts`
- `src/api/wedding.ts`
- `src/api/types/index.ts`
- `src/components/AppRsvp.vue`
- `src/components/RsvpLoading.vue`
- `src/components/RsvpWelcome.vue`
- `src/components/RsvpForm.vue`
- `src/components/RsvpSuccess.vue`
- `src/components/RsvpMessage.vue`
- `src/components/RsvpOptionCard.vue`
- `.env`
- `.env.example`

The whole `src/api/` tree is gone with those three files.

## Files modified

### `src/App.vue`

Remove the `AppRsvp` import and the `<AppRsvp />` element. Remove the surrounding `<FloralDivider />` that previously separated Details from RSVP, since its only purpose was RSVP spacing. The new page flow:

```
Cover  →  Story  →  Photos  →  Details  →  Footer
```

with a `FloralDivider` between each pair.

### `src/stores/wedding.ts`

Keep the `couple` reactive object (static couple info — not backend data). Remove everything else:

- Imports of `ApiRequestError`, `getGuest`, `submitRsvp as submitRsvpRequest`, `Guest` from `@/api/wedding`.
- The exported `RsvpResponse` type alias.
- Refs: `guest`, `loading`, `submitting`, `loadError`, `submitError`.
- Actions: `loadGuest`, `submitRsvp`.
- Those keys in the returned object.

Final store public surface: `{ couple }` — a single reactive object with the nine couple fields listed below. Still defined with `defineStore('wedding', …)` and still consumed via `useWeddingStore()` so `AppCover` / `AppStory` / `AppPhotos` / `AppDetails` / `AppFooter` continue to read `store.couple.*` unchanged.

The `couple` fields preserved:

| Field          | Example value                                       |
| -------------- | --------------------------------------------------- |
| `partnerOne`   | `Mahtab`                                            |
| `partnerTwo`   | `Ali`                                               |
| `tagline`      | `Two hearts. One story. Forever.`                   |
| `longMessage`  | (multi-line story copy)                             |
| `photoOne`     | `/photos/photo-1.jpg.svg`                           |
| `photoTwo`     | `/photos/photo-2.jpg.svg`                           |
| `date`         | `Tuesday, 01 August 2026`                           |
| `ceremonyTime` | `6:00 in the evening`                               |
| `receptionTime`| `7:30 in the evening`                               |
| `venue`        | `Takhte Jamshid Palace`                             |
| `address`      | `Shandiz, Mashhad`                                  |
| `quote`        | `"And over all these virtues..."` (Colossians 3:14) |
| `quoteSource`  | `— Colossians 3:14`                                 |

## Files unchanged on purpose

- `src/main.ts`, `src/styles.css`, `src/composables/useReveal.ts`
- `uno.config.ts`, `vite.config.ts`, `tsconfig*.json`, `env.d.ts`
- `package.json`, `pnpm-lock.yaml`, `index.html`
- `.prettierrc`, `.prettierignore`, `.gitignore`, `README.md`
- `src/components/AppCover.vue`, `AppStory.vue`, `AppPhotos.vue`, `AppDetails.vue`, `AppFooter.vue`
- `src/components/FloralDivider.vue`, `FloralBackdrop.vue`, `Ampersand.vue`, `PhotoFrame.vue`, `DetailCard.vue`, `FloralAccent.vue`, `WreathDecoration.vue`

`pinia` stays as a dependency: the store still uses it, just with a slimmer body.

## Verification

Run from `wedding-client/`:

1. `pnpm type-check` — must pass. Catches any leftover import of a deleted symbol or file.
2. `pnpm build` — must succeed. Catches any template that still references a removed component.
3. `pnpm dev` + manual scroll — confirm the page renders Cover → Story → Photos → Details → Footer with no RSVP section and a clean console (no failed fetch, no 404 for missing assets beyond what already existed).
4. `grep -rn "api/wedding\|api/client\|api/types\|RsvpLoading\|RsvpWelcome\|RsvpForm\|RsvpSuccess\|RsvpMessage\|RsvpOptionCard\|AppRsvp\|loadGuest\|submitRsvp\|VITE_API_BASE\|ApiRequestError" src .env .env.example 2>/dev/null` — must return zero matches. This is the post-change invariant: nothing references the removed backend surface.

## Implementation order

1. Delete the 12 files listed above.
2. Edit `src/App.vue`: remove the `AppRsvp` import, the `<AppRsvp />` element, and the surrounding `FloralDivider`.
3. Edit `src/stores/wedding.ts`: strip backend-only code; keep `couple` and the Pinia wrapper.
4. Run the four verification steps. Fix any failures before declaring done.
