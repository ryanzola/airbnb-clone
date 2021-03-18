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
  modules: ['~/modules/auth', '~/modules/algolia'],
  buildModules: ['@nuxtjs/tailwindcss'],
  publicRuntimeConfig: {
    auth: {
      cookieName: 'idToken',
      clientId: '508242901875-ibctftuvnti3q2v7bgem2viubjvvhgt4.apps.googleusercontent.com'
    },
    algolia: {
      appId: 'ZYTJI836W0',
      key: 'd098b6d1a118b5c6af424db84a43b747'
    }
  },
  privateRuntimeConfig: {
    algolia: {
      appId: 'ZYTJI836W0',
      key: '95953fbb181a98dbfe02be221a8269fd'
    }
  },
  serverMiddleware: []
}