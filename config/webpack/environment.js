const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

environment.plugins.prepend(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    bootstrap: 'bootstrap',
  })
)

module.exports = environment
