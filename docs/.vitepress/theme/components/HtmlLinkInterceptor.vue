<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

let cleanup: (() => void) | undefined

onMounted(() => {
  const staticHtmlRoutes = [
    '/0cloaker.html',
    '/ai/chatgpt.html',
    '/ai/index.html',
    '/dailydox/ethan-zang.html',
    '/ddx.html',
    '/discord/index.html',
    '/discord/tags.html',
    '/discord/timestamp.html',
    '/discord/webhook.html',
    '/dsctags.html',
    '/eaglerx.html',
    '/gambling.html',
    '/gambling/blackjack.html',
    '/gambling/coinflip.html',
    '/gambling/index.html',
    '/gambling/jackblack.html',
    '/gambling/roulette.html',
    '/gambling/slots.html',
    '/games.html',
    '/games/Snakegame.html',
    '/games/brick-breaker.html',
    '/games/connect-the-pipes.html',
    '/games/index.html',
    '/games/maze.html',
    '/games/mini-car-game.html',
    '/games/simple-tower-defense-game.html',
    '/games/slopeoffline.html',
    '/games/tetris.html',
    '/games/tic-tac-toe.html',
    '/home.html',
    '/info/about.html',
    '/info/privacy.html',
    '/math.html',
    '/math/desmos-embed.html',
    '/math/desmos.html',
    '/math/index.html',
    '/math/percentage.html',
    '/math/quadratic-equation-solver.html',
    '/math/unit-converter.html',
    '/math/wpm-calc.html',
    '/minecraft/eaglerx.html',
    '/minecraft/index.html',
    '/minecraft/mods.html',
    '/minecraft/plugins.html',
    '/minecraft/servers.html',
    '/minecraft/skins.html',
    '/privacy.html',
    '/private/race-counter.html',
    '/tools/base64.html',
    '/tools/cloaker.html',
    '/tools/color-picker.html',
    '/tools/csv-json.html',
    '/tools/diff-checker.html',
    '/tools/gradient-generator.html',
    '/tools/hash-generator.html',
    '/tools/html-entities.html',
    '/tools/index.html',
    '/tools/json-formatter.html',
    '/tools/jwt-decoder.html',
    '/tools/lorem-generator.html',
    '/tools/markdown-preview.html',
    '/tools/open-source-research.html',
    '/tools/password-generator.html',
    '/tools/qr-generator.html',
    '/tools/regex-tester.html',
    '/tools/search-operator-builder.html',
    '/tools/slug-generator.html',
    '/tools/text-tools.html',
    '/tools/timestamp-converter.html',
    '/tools/url-encoder.html',
    '/tools/uuid-generator.html',
    '/translators.html',
    '/translators/binary.html',
    '/translators/index.html',
    '/translators/leetspeak.html',
    '/translators/minecraft&english.html',
    '/translators/minecraft.html',
    '/translators/morse.html'
  ] as const

  const staticHtmlRouteSet = new Set<string>(staticHtmlRoutes)

  const staticRouteMap = staticHtmlRoutes.reduce<Record<string, string>>((map, route) => {
    map[route] = route

    const extensionless = route.replace(/\.html$/, '')
    map[extensionless] = route
    map[extensionless + '/'] = route

    if (route.endsWith('/index.html')) {
      const directory = route.slice(0, -'/index.html'.length)
      map[directory] = route
      map[directory + '/'] = route
    }

    return map
  }, {})

  const forceHardLoadIfStaticHtmlRoute = () => {
    const current = window.location.pathname

    if (!staticHtmlRouteSet.has(current)) {
      return false
    }

    window.location.replace(current + window.location.search + window.location.hash)
    return true
  }

  const normalizeStaticRoute = () => {
    if (forceHardLoadIfStaticHtmlRoute()) {
      return
    }

    const redirect = staticRouteMap[window.location.pathname]

    if (!redirect) {
      return
    }

    const target = redirect + window.location.search + window.location.hash

    if (window.location.pathname + window.location.search + window.location.hash !== target) {
      window.location.replace(target)
    }
  }

  const interceptHtmlNavigation = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    const target = event.target

    if (!(target instanceof Element)) {
      return
    }

    const anchor = target.closest('a[href]') as HTMLAnchorElement | null

    if (!anchor) {
      return
    }

    const href = anchor.getAttribute('href')

    if (!href || href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:') || href.startsWith('#')) {
      return
    }

    const resolved = new URL(anchor.href, window.location.origin)
    const redirect = staticRouteMap[resolved.pathname]

    if (!redirect) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    event.stopImmediatePropagation()
    window.location.assign(redirect + resolved.search + resolved.hash)
  }

  const originalPushState = window.history.pushState.bind(window.history)
  const originalReplaceState = window.history.replaceState.bind(window.history)

  window.history.pushState = function (...args) {
    originalPushState(...args)
    normalizeStaticRoute()
  }

  window.history.replaceState = function (...args) {
    originalReplaceState(...args)
    normalizeStaticRoute()
  }

  document.addEventListener('click', interceptHtmlNavigation, true)
  window.addEventListener('popstate', normalizeStaticRoute)
  normalizeStaticRoute()

  cleanup = () => {
    document.removeEventListener('click', interceptHtmlNavigation, true)
    window.removeEventListener('popstate', normalizeStaticRoute)
    window.history.pushState = originalPushState
    window.history.replaceState = originalReplaceState
  }
})

onUnmounted(() => {
  cleanup?.()
})
</script>

<template></template>
