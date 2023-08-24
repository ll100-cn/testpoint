const { VueLoaderPlugin } = require('vue-loader')
const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin')
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
    new VueAutoRoutingPlugin({
      pages: 'app/javascript/frontend/pages',
      importPrefix: '@/pages/'
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: [ '.vue' ],
    alias: {
      "vue$": 'vue/dist/vue.esm-bundler.js',
      "@": path.resolve(__dirname, '../../..', 'app/javascript/frontend')
    },
  }
}
