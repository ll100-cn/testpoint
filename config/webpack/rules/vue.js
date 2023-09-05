const { VueLoaderPlugin } = require('vue-loader')
const VueRouter = require('unplugin-vue-router/webpack').default
const path = require("path")

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    VueRouter({
      routesFolder: 'app/javascript/frontend/pages',
      exclude: [ "**/[A-Z]*.vue" ],
      dts: [ 'app/javascript/frontend/typed-router.d.ts' ]
    }),
  ],
  resolve: {
    extensions: [ '.vue' ],
    alias: {
      "vue$": 'vue/dist/vue.esm-bundler.js',
      "@": path.resolve(__dirname, '../../..', 'app/javascript/frontend')
    },
  }
}
