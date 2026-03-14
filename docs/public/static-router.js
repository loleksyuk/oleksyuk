(function () {
  var staticHtmlRoutes = [
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
  ];

  var staticRouteSet = new Set(staticHtmlRoutes);
  var staticRouteMap = staticHtmlRoutes.reduce(function (map, route) {
    map[route] = route;

    var extensionless = route.replace(/\.html$/, '');
    map[extensionless] = route;
    map[extensionless + '/'] = route;

    if (route.slice(-11) === '/index.html') {
      var directory = route.slice(0, -11);
      map[directory] = route;
      map[directory + '/'] = route;
    }

    return map;
  }, {});

  function redirectTo(target) {
    var resolved = target + window.location.search + window.location.hash;
    if (window.location.pathname + window.location.search + window.location.hash !== resolved) {
      window.location.replace(resolved);
      return true;
    }
    return false;
  }

  function normalizeStaticRoute() {
    if (staticRouteSet.has(window.location.pathname)) {
      window.location.reload();
      return;
    }

    var redirect = staticRouteMap[window.location.pathname];
    if (!redirect) {
      return;
    }

    redirectTo(redirect);
  }

  function interceptStaticNavigation(event) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    var target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    var anchor = target.closest('a[href]');
    if (!anchor) {
      return;
    }

    var href = anchor.getAttribute('href');
    if (!href || href.indexOf('http') === 0 || href.indexOf('//') === 0 || href.indexOf('mailto:') === 0 || href.indexOf('#') === 0) {
      return;
    }

    var resolved = new URL(anchor.href, window.location.origin);
    var redirect = staticRouteMap[resolved.pathname];
    if (!redirect) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    window.location.assign(redirect + resolved.search + resolved.hash);
  }

  var originalPushState = window.history.pushState.bind(window.history);
  var originalReplaceState = window.history.replaceState.bind(window.history);

  window.history.pushState = function () {
    originalPushState.apply(window.history, arguments);
    normalizeStaticRoute();
  };

  window.history.replaceState = function () {
    originalReplaceState.apply(window.history, arguments);
    normalizeStaticRoute();
  };

  document.addEventListener('click', interceptStaticNavigation, true);
  window.addEventListener('popstate', normalizeStaticRoute);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', normalizeStaticRoute, { once: true });
  } else {
    normalizeStaticRoute();
  }
})();
