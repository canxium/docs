import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
// import { textAdPlugin } from './textAdMdPlugin'

const nav: ThemeConfig['nav'] = [
  {
    text: 'Docs',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
    items: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Wallet', link: '/guide/quick-start#set-up-a-wallet' },
      { text: 'Quick Start', link: '/guide/quick-start' },
      { text: 'Glossary', link: '/guide/essentials/glossary/' },
      { text: 'Security Audits', link: '/guide/essentials/audits/' },
      { text: 'Retained PoW Mining', link: '/guide/essentials/retained-pow-mining/' },
      { text: 'How To Mine CAU: Independent', link: '/guide/essentials/how-to-mine/' },
      { text: 'How To Mine CAU: Cross Chain', link: '/guide/essentials/how-to-cross-chain-mining' },
      {
        text: 'Tokenomics',
        link: '/whitepaper/tokenomics/tokenomics'
      },
      {
        text: 'Lighthouse Docs',
        link: 'https://lighthouse-book.sigmaprime.io/intro.html'
      },
      {
        text: 'Prysm Docs',
        link: 'https://docs.prylabs.network/docs/getting-started'
      },
      {
        text: 'Lodestar Docs',
        link: 'https://chainsafe.github.io/lodestar/'
      }
    ]
  },
  { text: 'Timeline', link: '/timeline/' },
  {
    text: 'API',
    activeMatch: `^/api/`,
    link: '/api/endpoints'
  },
  {
    text: 'Whitepaper',
    link: '/whitepaper/abstract'
  },
  {
    text: 'Ecosystem',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: 'Resources',
        items: [
          { text: 'Partners', link: '/partners/' },
          { text: 'Validators', link: 'https://epoch.canxium.org/' },
          { text: 'App', link: 'https://app.canxium.org/' },
          { text: 'Bridge', link: 'https://app.canxium.org/#/bridge' },
          { text: 'Scan', link: 'https://scan.canxium.org/' },
          { text: 'Testnet Scan', link: 'https://testnet-scan.canxium.net/' },
          { text: 'Faucet', link: 'https://faucet.canxium.org/' },
          { text: 'Coingecko', link: 'https://www.coingecko.com/en/coins/canxium' },
          { text: 'Coinmarketcap', link: 'https://coinmarketcap.com/currencies/canxium/' },
          { text: 'Livecoinwatch', link: 'https://www.livecoinwatch.com/price/Canxium-CAU' },
          { text: 'Geckoterminal', link: 'https://www.geckoterminal.com/canxium/pools' },
          { text: 'Brand Toolkit', link: 'https://drive.google.com/file/d/12H7FGSuJL39HVCMuUYB0il9nsuyFb8ae/view?usp=sharing' },
        ]
      },
      {
        text: 'Libraries',
        items: [
          { text: 'Go Web3', link: 'https://github.com/canxium/go-web3' },
          { text: 'Staking CLI', link: 'https://github.com/canxium/staking-deposit-cli' },
          { text: 'Token List', link: 'https://github.com/canxium/swap-default-token-list' }
        ]
      },
      {
        text: 'Video Courses',
        items: [
          {
            text: 'Retained PoW Mining (formerly Offline Mining)',
            link: 'https://www.youtube.com/watch?v=r9AapliszqA'
          },
          {
            text: '$CAU Mining',
            link: 'https://www.youtube.com/watch?v=15kHFXmqtwg'
          }
        ]
      },
      {
        text: 'Help',
        items: [
          {
            text: 'Telegram Chat',
            link: 'https://t.me/canxiumofficial'
          },
          {
            text: 'GitHub Discussions',
            link: 'https://github.com/canxium/go-canxium/discussions'
          }
        ]
      },
      {
        text: 'News',
        items: [
          { text: 'Blog', link: 'https://canxium.medium.com/' },
          { text: 'Twitter', link: 'https://x.com/canxiumchain' }
        ]
      }
    ]
  },
  {
    text: 'About',
    activeMatch: `^/about/`,
    items: [
      { text: 'FAQ', link: '/about/faq' },
      { text: 'Team', link: '/about/team' },
      { text: 'Releases', link: '/about/releases' },
      { text: 'Privacy Policy', link: '/privacy' },
      { text: 'Terms of Service', link: '/tos' },
      { text: 'Code of Conduct', link: '/about/coc' },
      { text: 'Contact Us', link: '/about/contact' },
    ]
  },
  // {
  //   text: 'Sponsor',
  //   link: '/sponsor/'
  // },
  // {
  //   text: 'Experts',
  //   badge: { text: 'NEW' },
  //   activeMatch: `^/(partners|developers)/`,
  //   items: [
  //     { text: 'Partners', link: '/partners/' },
  //     { text: 'Developers', link: '/developers/', badge: { text: 'NEW' } }
  //   ]
  // }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/guide/': [
    {
      text: 'Getting Started',
      items: [
        { text: 'Introduction', link: '/guide/introduction' },
        {
          text: 'Quick Start',
          link: '/guide/quick-start'
        }
      ]
    },
    {
      text: 'Essentials',
      items: [
        {
          text: 'RPCs',
          link: '/guide/essentials/rpc'
        },
        {
          text: 'Bridge',
          link: '/guide/essentials/bridge'
        },
        {
          text: 'Acquire $CAU & $OFF',
          link: '/guide/essentials/acquire'
        },
        {
          text: 'Glossary',
          link: '/guide/essentials/glossary'
        },
        {
          text: 'Canxium Consensus',
          link: '/guide/essentials/consensus'
        },
        {
          text: 'Validator Rewards',
          link: '/guide/essentials/rewards'
        },
        {
          text: 'Tokenomics',
          link: '/whitepaper/tokenomics/tokenomics'
        },
        { text: 'Nodes and Networks', link: '/guide/essentials/nodes' },
        {
          text: 'Dex Contracts',
          link: '/guide/essentials/dex'
        },
        {
          text: 'Security Audits',
          link: '/guide/essentials/audits'
        },
        {
          text: 'Community',
          link: '/guide/essentials/community'
        },
        { text: 'Retained PoW Mining', link: '/guide/essentials/retained-pow-mining' },
        { text: 'CAU Mining: Independent', link: '/guide/essentials/how-to-mine' },
        { text: 'CAU Mining: Cross-Chain', link: '/guide/essentials/how-to-cross-chain-mining' },
        { text: 'Cross-Chain Mining: Pool Approval Criteria', link: '/guide/essentials/cross-chain-mining-criteria' }
      ]
    },
    {
      text: 'RPC Nodes',
      items: [
        {
          text: 'Prerequisites',
          link: '/guide/rpc-nodes/prerequisites'
        },
        { text: 'Setup', link: '/guide/rpc-nodes/setup' },
      ]
    },
    {
      text: 'Validator Nodes',
      items: [
        {
          text: 'Prerequisites',
          link: '/guide/validator/prerequisites'
        },
        { text: 'Keys', link: '/guide/validator/keys' },
        { text: 'Deposit', link: '/guide/validator/deposit' },
        { text: 'Setup Node', link: '/guide/validator/setup' },
        { text: 'Exit Node', link: '/guide/validator/exit' },
      ]
    }
  ],
  '/whitepaper/': [
    {
      text: 'Overview',
      items: [
        { text: 'Abstract', link: '/whitepaper/abstract' },
        { text: 'Introduction', link: '/whitepaper/introduction' },
        { text: 'Problem Statement', link: '/whitepaper/statement' }
      ]
    },
    {
      text: 'Objectives',
      items: [
        {
          text: 'Overview',
          link: '/whitepaper/objectives/overview'
        },
        {
          text: 'Suitable Supply Model',
          link: '/whitepaper/objectives/supply'
        },
        {
          text: 'Mitigate Mining Cost Volatility',
          link: '/whitepaper/objectives/mining'
        },
        {
          text: 'Stability and Reliability',
          link: '/whitepaper/objectives/stability'
        },
        {
          text: 'Accessibility and Usability',
          link: '/whitepaper/objectives/accessibility'
        },
      ]
    },
    {
      text: 'Canxium In-Depth',
      items: [
        {
          text: 'Summary',
          link: '/whitepaper/depth/summary'
        },
        { text: 'Stabilize Mining Costs', link: '/whitepaper/depth/stabilize' },
        { text: 'Retained Proof of Work', link: '/whitepaper/depth/retained_pow' },
        { text: 'Proof Of Demand', link: '/whitepaper/depth/pod' },
        { text: 'Proof Of Stake', link: '/whitepaper/depth/pos' },
        { text: 'Smart Contract', link: '/whitepaper/depth/contract' }
      ]
    },
    {
      text: 'Technical Details',
      items: [
        { text: 'Independent Retained PoW', link: '/whitepaper/technical/independent_pow' },
        { text: 'Cross-Chain Retained PoW', link: '/whitepaper/technical/cross_chain_pow' },
        { text: 'Proof Of Demand', link: '/whitepaper/technical/pod' },
        { text: 'Proof Of Stake', link: '/whitepaper/technical/pos' },
      ]
    },
    {
      text: 'Extra Details',
      items: [
        { text: 'Tokenomics', link: '/whitepaper/tokenomics/tokenomics' },
        { text: 'Independent Mining Rewards', link: '/whitepaper/tokenomics/independent_mining_rewards' },
        { text: 'Cross-Chain Mining Rewards', link: '/whitepaper/tokenomics/cross_chain_mining_rewards' },
        { text: 'Use Cases', link: '/whitepaper/usecases' },
      ]
    }
  ],
  '/api/': [
    {
      text: 'Execution  RPC',
      items: [
        { text: 'Endpoints', link: '/api/endpoints' },
        {
          text: 'go-canxium',
          link: '/api/general'
        }
      ]
    },
    {
      text: 'Consensus API',
      items: [
        { text: 'Lighthouse', link: '/api/lighthouse' },
        {
          text: 'Prsym',
          link: '/api/prysm'
        }
      ]
    },
    {
      text: 'Scan API',
      items: [
        { text: 'General', link: '/api/scan-api' },
        { text: 'Hardhat', link: '/api/scan-hardhat' }
      ]
    }
  ]
}

// Placeholder of the i18n config for @vuejs-translations.
// const i18n: ThemeConfig['i18n'] = {
// }

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  sitemap: {
    hostname: 'https://canxium.org'
  },

  lang: 'en-US',
  title: 'Canxium',
  description: 'Canxium - Powering Crypto, Even Offline',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:url', content: 'https://canxium.org/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Canxium' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Canxium - Powering Crypto, Even Offline'
      }
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://canxium.org/images/icon.png'
      }
    ],
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/restorePreference.js'),
        'utf-8'
      )
    ],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/uwu.js'),
        'utf-8'
      )
    ],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'XNOLWPLB',
        'data-spa': 'auto',
        defer: ''
      }
    ]
  ],

  themeConfig: {
    nav,
    sidebar,
    // Placeholder of the i18n config for @vuejs-translations.
    // i18n,
    algolia: {
      indexName: 'vuejs',
      appId: 'ML0LEBN7FQ',
      apiKey: '21cf9df0734770a2448a9da64a700c22',
      searchParameters: {
        facetFilters: ['version:v3']
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/canxium/' },
      { icon: 'twitter', link: 'https://x.com/canxiumchain' },
    ],

    editLink: {
      repo: 'canxium/docs',
      text: 'Edit this page on GitHub'
    },

    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Copyright © 2023-${new Date().getFullYear()} Canxium, Website designed by Evan You @ Vuejs`
    }
  },

  markdown: {
    theme: 'github-dark',
    config(md) {
      md.use(headerPlugin)
      // .use(textAdPlugin)
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  }
})
