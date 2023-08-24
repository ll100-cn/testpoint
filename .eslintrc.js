module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    'standard',
  ],
  plugins: [ 'only-warn' ],
  rules: {
    "semi": "off",
    "quotes": "off",
    "quote-props": "off",
    "space-before-function-paren": [ "error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"
    }],
    "array-bracket-spacing": [ "error", "always", {
      "objectsInArrays": false
    }],
    "arrow-parens": [ "error", "always" ],
    "eqeqeq": "off",
    "import/order": "off",
    "import/extensions": "off",
    "import/no-dynamic-require": "off",
    "func-names": "off",
    "no-restricted-globals": "off",
    "no-restricted-syntax": "off",
    "max-len": [ "error", { "code": 180 }],
    "vue/require-prop-types": "off",
    "vue/require-default-prop": "off",
    "vue/no-v-html": "off",
    "no-unused-expressions": "off",
    "comma-dangle": "off",
    "no-else-return": "off",
    "no-param-reassign": [ "error", { "props": false }],
    "object-shorthand": "off",
    "node/no-callback-literal": "off",
    "no-return-await": "off",
    "indent": [ "error", 2, {
      "MemberExpression": "off",
      "SwitchCase": 1
    }],
    "import/first": "off",
    "class-methods-use-this": "off",
    "import/no-unresolved": "off",
    "newline-per-chained-call": "off",
    "arrow-body-style": "off",
    "no-underscore-dangle": "off",
    "prefer-destructuring": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/max-attributes-per-line": "off",
    "vue/no-mutating-props": "off",
    // TODO：循环使用 awit 改为 Promise.all()
    "no-await-in-loop": "warn",
    "import/no-cycle": "off",
    "node/no-deprecated-api": "off",
    "guard-for-in": "off",
    "vue/multi-word-component-names": "off",
    "camelcase": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/one-component-per-file": "off",
    "vue/prop-name-casing": "off",
    "vue/require-explicit-emits": "off"
  },
}
