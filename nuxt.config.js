require('dotenv').config()
export default {
  mode: 'spa',
  router: {
    middleware: 'subdomain'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: "msapplication-TileColor", content: "#F7CF87" },
      { name: "theme-color", content: "#F7CF87" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css' },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/images/fav/apple-touch-icon.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/images/fav/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/images/fav/favicon-16x16.png" },
      { rel: "manifest", href: "/images/fav/site.webmanifest" },
      { rel: "mask-icon", href: "/images/fav/safari-pinned-tab.svg", color: "#5c008d" }
    ]
  },
  env: {
    appName: 'Create. Together.',
    baseUrl: process.env.BASE_URL,
    baseApiUrl: process.env.API_BASE_URL,
    tokenName: 'satellizer_token',
    sessionName: 'member'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'transparent' },
  /*
  ** Global CSS
  */
  css: [       
    '@/assets/css/app.scss',

  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/tooltip.js'}, 
    { src: '~/plugins/cookie.js'}, 
    //{ src: '~/plugins/analytics.js', mode: 'client' }
    // { src: '~/plugins/markdown.js', ssr: true }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    
  },
  purgeCSS: { enabled: false },
  
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-validate',
    '@nuxtjs/toast',
    '@nuxtjs/google-gtag'
  ],
  'google-gtag': {
    id: 'UA-161763732-1',
    config: {
      anonymize_ip: true, // anonymize IP 
      send_page_view: false, // might be necessary to avoid duplicated page track on page reload
      // linker: {
      //   domains: ['domain.com','domain.org']
      // }
    },
    debug: false // enable to track in dev mode
  },
  toast: {
    position: 'top-center',
    duration: 4000
  },
  /*
  ** Build configuration
  */
  build: {
  
  },
  axios: {
    baseURL: process.env.API_BASE_URL
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'token' },
          user: { url: '/me', method: 'get', propertyName: false },
          logout: false
        }
      }
    }
  }
}
