<template>
  <div
    aria-hidden="true"
    class="absolute inset-0 flex items-center justify-center pointer-events-none"
  >
    <svg viewBox="0 0 400 400" class="w-[min(80vw,420px)] h-[min(80vw,420px)] opacity-60">
      <defs>
        <radialGradient id="wreathGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f3dcd5" stop-opacity="0.7" />
          <stop offset="60%" stop-color="#f3dcd5" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#f3dcd5" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="wreathRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#c9a961" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#b87979" stop-opacity="0.6" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="195" fill="url(#wreathGlow)" />
      <circle
        cx="200"
        cy="200"
        r="160"
        fill="none"
        stroke="url(#wreathRing)"
        stroke-width="0.8"
        stroke-dasharray="3 6"
      />
      <g fill="#c9a961" opacity="0.85">
        <circle cx="200" cy="40" r="2.2" />
        <circle cx="200" cy="360" r="2.2" />
        <circle cx="40" cy="200" r="2.2" />
        <circle cx="360" cy="200" r="2.2" />
      </g>
      <g fill="#d4a5a5" opacity="0.9">
        <circle cx="313" cy="87" r="2" />
        <circle cx="87" cy="313" r="2" />
        <circle cx="313" cy="313" r="2" />
        <circle cx="87" cy="87" r="2" />
      </g>
    </svg>
  </div>
</template>
