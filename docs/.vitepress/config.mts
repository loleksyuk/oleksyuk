import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'oleksyuk',
  description: 'oleksyuk browser hub for games, tools, utilities, and projects.',
  cleanUrls: false,
  appearance: 'force-dark',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        href: 'https://0bsidian.s3.us-east-2.amazonaws.com/Images/Geometric_Gray_Gemstone-removebg-preview.png'
      }
    ],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap'
      }
    ],
    ['script', { src: '/static-router.js' }]
  ],
  themeConfig: {
    siteTitle: 'oleksyuk',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Browse',
        items: [
          { text: 'Classic Home', link: '/home.html' },
          { text: 'Games', link: '/games/index.html' },
          { text: 'Casino', link: '/gambling/index.html' },
          { text: 'Tools', link: '/tools/index.html' },
          { text: 'Math', link: '/math/index.html' },
          { text: 'Minecraft', link: '/minecraft/index.html' },
          { text: 'Discord', link: '/discord/index.html' },
          { text: 'AI', link: '/ai/index.html' }
        ]
      },
      { text: 'About', link: '/info/about.html' }
    ],
    search: {
      provider: 'local'
    },
    footer: {
      copyright: 'Copyright © 2026 oleksyuk'
    }
  }
})
