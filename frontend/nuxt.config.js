export default {
  head: {
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap',
      },
    ],
  },
  router: {
    middleware: 'auth',
  },
  css: [
    '~/assets/vendor/nucleo/css/nucleo.css',
    '~/assets/scss/argon.scss',
    '~/assets/scss/app.scss',
  ],

  plugins: ['~plugins/argon-dashboard', '~plugins/socket.client'],

  components: true,

  buildModules: ['@nuxtjs/eslint-module'],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: true, // Or `bvCSS: false`
    icons: true,
  },

  modules: ['bootstrap-vue/nuxt', '@nuxtjs/pwa'],

  build: {},
}
