const webpack = require('webpack')
const { realpathSync } = require('fs')

module.exports = {
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      }
    ]
  },
  resolve: {
    symlinks: false,
    alias: {
      jQuery: 'jquery',
      '$': 'jquery'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.Dropdown': ['bootstrap', 'Dropdown'] // fix error: https://github.com/snapappointments/bootstrap-select/pull/2736
    }),
    new webpack.EnvironmentPlugin({
      'RAILS_RELATIVE_URL_ROOT': process.env.RAILS_RELATIVE_URL_ROOT || '/',
    })
  ],
  optimization: {
    runtimeChunk: {
      name: (entrypoint) => {
        if (['event_props', 'functions'].includes(entrypoint.name)) {
          return
        }

        return 'runtime'
      }
    },
    splitChunks: {
      chunks(chunk) {
        return !['event_props', 'functions'].includes(chunk.name)
      }
    }
  }
}
