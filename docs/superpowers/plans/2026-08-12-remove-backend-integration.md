# Remove Backend Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Delete every backend reference from `wedding-client/` and remove the RSVP feature entirely, leaving a static couples-info page with no network calls, no API directory, no env files, and no RSVP components.

**Architecture:** Pure deletion plus a minimal store slimmer. Files that exist solely to support the RSVP round-trip are removed wholesale; `src/stores/wedding.ts` is reduced to its static `couple` reactive; `src/App.vue` drops the `AppRsvp` import and element plus one surrounding `FloralDivider`. No new code, no new tests, no new dependencies. Verification leans on `pnpm type-check`, `pnpm build`, manual scroll, and a final grep invariant.

**Tech Stack:** Vue 3 (`<script setup>`), Pinia, TypeScript, Vite, UnoCSS, pnpm.

## Global Constraints

These come from the spec verbatim and apply to every task:

- **Scope is `wedding-client/` only.** The sibling `wedding-backend/` directory at `/Users/alibm/Documents/tmp/wedding/wedding-backend/` is not touched.
- **No replacement static RSVP block.** The RSVP section is gone, not repurposed.
- **No README or config edits.** None of those files reference the deleted code, so they stay as-is.
- **`pinia` stays as a dependency.** The store (now slimmer) still uses it.
- **Final invariant:** the grep
  `grep -rn "api/wedding\|api/client\|api/types\|RsvpLoading\|RsvpWelcome\|RsvpForm\|RsvpSuccess\|RsvpMessage\|RsvpOptionCard\|AppRsvp\|loadGuest\|submitRsvp\|VITE_API_BASE\|ApiRequestError" src .env .env.example 2>/dev/null`
  must return zero matches.
- **Final page flow:** Cover → Story → Photos → Details → Footer, with a `FloralDivider` between each pair.
- **Couple data preserved unchanged:** `partnerOne`, `partnerTwo`, `tagline`, `longMessage`, `photoOne`, `photoTwo`, `date`, `ceremonyTime`, `receptionTime`, `venue`, `address`, `quote`, `quoteSource` — same field names, same example values as in `src/stores/wedding.ts` today.

---

### Task 1: Delete RSVP and backend files

**Files:**
- Delete: `src/api/client.ts`
- Delete: `src/api/wedding.ts`
- Delete: `src/api/types/index.ts`
- Delete: `src/components/AppRsvp.vue`
- Delete: `src/components/RsvpLoading.vue`
- Delete: `src/components/RsvpWelcome.vue`
- Delete: `src/components/RsvpForm.vue`
- Delete: `src/components/RsvpSuccess.vue`
- Delete: `src/components/RsvpMessage.vue`
- Delete: `src/components/RsvpOptionCard.vue`
- Delete: `.env`
- Delete: `.env.example`

This removes the whole `src/api/` tree and all files whose sole purpose is the RSVP network round-trip. No replacements.

**Interfaces:**
- Consumes: nothing (pure deletion)
- Produces: a working tree where none of these paths exist and `git status` shows them as deleted

- [ ] **Step 1: Confirm you are on the `feat/remove-backend` branch**

Run from `wedding-client/`:
```bash
git branch --show-current
```
Expected: `feat/remove-backend`

- [ ] **Step 2: Delete the API tree**

Run from `wedding-client/`:
```bash
rm -rf src/api
```
Expected: no output. The `src/api/` directory no longer exists.

- [ ] **Step 3: Delete the RSVP components**

Run from `wedding-client/`:
```bash
rm src/components/AppRsvp.vue \
   src/components/RsvpLoading.vue \
   src/components/RsvpWelcome.vue \
   src/components/RsvpForm.vue \
   src/components/RsvpSuccess.vue \
   src/components/RsvpMessage.vue \
   src/components/RsvpOptionCard.vue
```
Expected: no output.

- [ ] **Step 4: Delete the env files**

Run from `wedding-client/`:
```bash
rm .env .env.example
```
Expected: no output.

- [ ] **Step 5: Verify deletions are staged for git**

Run from `wedding-client/`:
```bash
git status --short
```
Expected: the deleted files appear with the `D` marker. Specifically you should see lines like:
```
D  src/api/client.ts
D  src/api/wedding.ts
D  src/api/types/index.ts
D  src/components/AppRsvp.vue
D  src/components/RsvpLoading.vue
D  src/components/RsvpWelcome.vue
D  src/components/RsvpForm.vue
D  src/components/RsvpSuccess.vue
D  src/components/RsvpMessage.vue
D  src/components/RsvpOptionCard.vue
D  .env
D  .env.example
```
Plus edits to `src/App.vue` and `src/stores/wedding.ts` should NOT appear yet — those land in Task 2.

- [ ] **Step 6: Sanity check: nothing imports the deleted files (yet)**

`App.vue` and `stores/wedding.ts` still reference the deleted files at this point, so a type-check would fail. Just confirm the deletions are what you intended:
```bash
ls src/api 2>&1 | head -5
```
Expected: `ls: src/api: No such file or directory`.

- [ ] **Step 7: Commit the deletions**

```bash
git add -A src/api src/components/AppRsvp.vue src/components/RsvpLoading.vue \
        src/components/RsvpWelcome.vue src/components/RsvpForm.vue \
        src/components/RsvpSuccess.vue src/components/RsvpMessage.vue \
        src/components/RsvpOptionCard.vue .env .env.example
git commit -m "feat: remove backend integration files

Delete src/api/* tree, all RSVP components, and .env files.
The store and App.vue are still broken at this point and will
be fixed in the next commit.

Co-Authored-By: Claude <noreply@anthropic.com>"
```
Expected: a commit hash printed; `git status` clean for these paths.

---

### Task 2: Slim the store and update App.vue

**Files:**
- Modify: `src/stores/wedding.ts` — keep only `couple` and the Pinia wrapper
- Modify: `src/App.vue` — drop `AppRsvp` import, element, and the divider below it

**Interfaces:**
- Consumes: the working tree from Task 1 (deleted RSVP files, deleted api tree)
- Produces: a type-clean, build-clean `wedding-client/` whose public store surface is exactly `{ couple }` and whose rendered page is Cover → Story → Photos → Details → Footer

- [ ] **Step 1: Replace `src/stores/wedding.ts` with the slim version**

Overwrite `src/stores/wedding.ts` with exactly this content (no imports beyond `pinia` and `vue`, no exports beyond the store itself and the `RsvpResponse` type which is also removed):

```ts
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
```

Note: `RsvpResponse`, `Guest`, `ApiRequestError`, `getGuest`, `submitRsvpRequest`, the `guest`/`loading`/`submitting`/`loadError`/`submitError` refs, and the `loadGuest`/`submitRsvp` actions are all gone. Only `defineStore` and `reactive` are imported.

- [ ] **Step 2: Edit `src/App.vue` — remove the RSVP section**

In `src/App.vue`:

1. Remove this import line from `<script setup>`:
   ```ts
   import AppRsvp from '@/components/AppRsvp.vue'
   ```

2. In the `<template>`, remove the `AppRsvp` block plus the `FloralDivider` that previously sat between `AppRsvp` and `AppFooter`. The `<FloralDivider />` between `AppDetails` and `AppRsvp` STAYS — it becomes the divider between Details and Footer.

The full file should end up like this (use this exact content):

```vue
<script setup lang="ts">
import AppCover from '@/components/AppCover.vue'
import AppPhotos from '@/components/AppPhotos.vue'
import AppStory from '@/components/AppStory.vue'
import AppDetails from '@/components/AppDetails.vue'
import AppFooter from '@/components/AppFooter.vue'
import FloralDivider from '@/components/FloralDivider.vue'
import FloralBackdrop from '@/components/FloralBackdrop.vue'
</script>

<template>
  <div class="relative w-full overflow-hidden">
    <FloralBackdrop />

    <main class="relative">
      <AppCover />

      <FloralDivider />

      <AppStory />

      <FloralDivider />

      <AppPhotos />

      <FloralDivider />

      <AppDetails />

      <FloralDivider />

      <AppFooter />
    </main>
  </div>
</template>
```

- [ ] **Step 3: Run the type check**

Run from `wedding-client/`:
```bash
pnpm type-check
```
Expected: exits 0, no TypeScript errors. Any leftover reference to `AppRsvp`, `Rsvp*`, `Guest`, `ApiRequestError`, `getGuest`, `submitRsvp`, `loadGuest`, `loadError`, `submitError`, `RsvpResponse`, or `@/api/*` will fail here.

- [ ] **Step 4: Run the build**

Run from `wedding-client/`:
```bash
pnpm build
```
Expected: exits 0, produces a `dist/` directory. This catches template-level references to deleted components that the type checker might not.

- [ ] **Step 5: Verify the invariant grep returns zero matches**

Run from `wedding-client/`:
```bash
grep -rn "api/wedding\|api/client\|api/types\|RsvpLoading\|RsvpWelcome\|RsvpForm\|RsvpSuccess\|RsvpMessage\|RsvpOptionCard\|AppRsvp\|loadGuest\|submitRsvp\|VITE_API_BASE\|ApiRequestError" src .env .env.example 2>/dev/null
```
Expected: no output (exit code 1 from grep is fine — it means "no matches", which is what we want).

- [ ] **Step 6: Commit the source edits**

```bash
git add src/stores/wedding.ts src/App.vue
git commit -m "feat: drop RSVP feature and slim wedding store

- stores/wedding.ts: keep only the static couple reactive. Drop
  guest/loading/submitting/loadError/submitError refs and the
  loadGuest/submitRsvp actions. Public surface is now { couple }.
- App.vue: remove AppRsvp import, element, and the FloralDivider
  that previously sat between AppRsvp and AppFooter. Page now
  flows Cover -> Story -> Photos -> Details -> Footer.

Co-Authored-By: Claude <noreply@anthropic.com>"
```
Expected: a commit hash printed; `git status` clean.

- [ ] **Step 7: Final smoke test (manual)**

Run from `wedding-client/`:
```bash
pnpm dev
```
Then open the URL Vite prints (usually `http://localhost:5173/`). Scroll top-to-bottom. Confirm:

1. The page renders Cover → Story → Photos → Details → Footer in that order, with a `FloralDivider` between each pair.
2. There is no RSVP section anywhere on the page.
3. Browser DevTools console shows no errors (in particular, no failed fetch / 404 for `/api/guests/...`).
4. The couple info (names, tagline, date, venue, story, photos, quote) renders correctly.

Then stop the dev server with Ctrl-C.

---

## Self-Review Checklist (run before handing off)

- [ ] All 12 files listed in Task 1 are deleted (3 under `src/api/`, 7 RSVP components, `.env`, `.env.example`).
- [ ] `src/stores/wedding.ts` has no imports from `@/api/*` and no refs/actions for guests, loading, errors, or submission.
- [ ] `src/App.vue` has no `AppRsvp` import, no `<AppRsvp />` element, and exactly four `FloralDivider` elements (one between each pair of remaining sections).
- [ ] `pnpm type-check` and `pnpm build` both pass.
- [ ] The invariant grep in Task 2 step 5 returns zero matches.
- [ ] No changes to `wedding-backend/`, `README.md`, `vite.config.ts`, `package.json`, or any other file outside the explicit list above.