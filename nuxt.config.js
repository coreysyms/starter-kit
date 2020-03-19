import pkg from './package'

export default {
  mode: 'universal',

    /*
  ** Headers of the page
  */
 head: {
  title: pkg.name,
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href:'https://fonts.googleapis.com/css?family=Lato:300,400,700' }
  ]
},

/*
** Customize the progress-bar color
*/
loading: { 
  color: '#0195ff',
  height: '6px'
},

/*
** Global CSS
*/
css: [
  '@/assets/css/app.css'
],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/globalcomponents.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-helmet',
  ],
  helmet: {
    dnsPrefetchControl: false,
    expectCt: false,
    featurePolicy: false,
    frameguard: true,
    hidePoweredBy: true,
    hsts: true,
    ieNoOpen: true,
    noCache: false,
    noSniff: true,
    permittedCrossDomainPolicies: false,
    referrerPolicy: false,
    xssFilter: true
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  router: {
    middleware: 'pageTemplate'
  },
    /*
  ** Plugin for 301s and the like
  */
  serverMiddleware: [
    '~/servermiddleware/redirects.js'
] ,
  /*
  ** Enviros
  */
 env: {
  CTF_SPACE_ID: 'XX-XX-XX-XX',
  CTF_CDA_ACCESS_TOKEN: 'XX-XX-XX-XX',
  CTF_CDA_ACCESS_TOKEN_PREVIEW_API: 'XX-XX-XX-XX',
},

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}