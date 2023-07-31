const { webpackConfig, merge } = require("shakapacker")
const customConfig = require("./custom.js")
const vueConfig = require('./rules/vue')
const typescriptConfig = require('./rules/typescript')


for (const rule of webpackConfig.module.rules) {
  if (rule.use) {
    for (const use of rule.use) {
      if (use.loader && use.loader.includes('sass-loader')) {
        use.options.sassOptions = use.options.sassOptions || {}
        use.options.sassOptions.quietDeps = true
      }
    }
  }
}

module.exports = merge(
  vueConfig,
  typescriptConfig,
  customConfig,
  webpackConfig
)
