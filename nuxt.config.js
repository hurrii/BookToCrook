
module.exports = {
  server: {
    port: 4444
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: false,
  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/styles.styl'
  ],
  styleResources: {
    stylus: [
      '~assets/styles/vars.styl'
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
