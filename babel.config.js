const shakapackerBabelPreset = require("shakapacker/package/babel/preset")

module.exports = function(api) {
  const result = shakapackerBabelPreset(api)
  result["presets"] = result["presets"].map((preset) => {
    if (preset == '@babel/preset-typescript') {
      return [ '@babel/preset-typescript', { allExtensions: true, isTSX: true } ]
    }

    return preset
  })

  result["plugins"] = [].concat(result["plugins"]).concat([
    "babel-plugin-transform-typescript-metadata",
    [ "@babel/plugin-proposal-decorators", { "legacy": true } ],
    [ "@babel/plugin-proposal-class-properties", { "loose": true } ]
  ])

  return result
}
