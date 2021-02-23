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
  plugins: ['~/plugins/maps.client', '~/plugins/dataApi', '~/plugins/auth.client'],
  modules: [],
  buildModules: ['@nuxtjs/tailwindcss'],
  publicRuntimeConfig: {
    auth: {
      cookieName: 'idToken',
      clientId: '508242901875-ibctftuvnti3q2v7bgem2viubjvvhgt4.apps.googleusercontent.com'
    },
  },
  privateRuntimeConfig: {
  }
}