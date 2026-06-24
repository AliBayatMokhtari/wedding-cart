import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/**
 * Adds the `is-visible` class to the bound element when it enters the viewport.
 * Used together with the `.reveal` class in styles.css for a soft fade-up.
 */
export function useReveal(rootRef?: Ref<HTMLElement | null>) {
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const root = rootRef?.value
    if (!root) return

    if (typeof IntersectionObserver === 'undefined') {
      isVisible.value = true
      root.classList.add('is-visible')
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            isVisible.value = true
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(root)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  return { isVisible }
}
