const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

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
