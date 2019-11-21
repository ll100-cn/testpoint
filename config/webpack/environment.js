const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

// resolve-url-loader must be used before sass-loader
environment.loaders.get('css').use.splice(-1, 0, {
  loader: 'resolve-url-loader',
  options: {
    attempts: 1
  }
});

environment.plugins.prepend(
  'Provide',
  new webpack.ProvidePlugin({
    // 兼容 bootstrap v4
    $: 'jquery',
    jQuery: 'jquery',
    Tether: 'tether',
    Popper: 'popper.js/dist/umd/popper.js'
  })
)

module.exports = environment
