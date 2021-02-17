export default {
  components: true,
  head: {
    titleTemplate: "Mastering Nuxt - %s",
    htmlAttrs: {
      lang: "en"
    },
    bodyAttrs: {
      class: ["my-style"]
    },
    meta: [
      {
        charset: 'utf-8'
      }
    ],
  },
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    }
  },
  css: ['~/assets/sass/app.scss'],
  plugins: ['~/plugins/maps.client', '~/plugins/dataApi'],
  modules: [],
  buildModules: ['@nuxtjs/tailwindcss'],
  publicRuntimeConfig: {
  },
  privateRuntimeConfig: {
  }
}