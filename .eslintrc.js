module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'indent': "off",
    'space-before-function-paren': "off",
    'no-console': 'off',
    'object-shorthand': 'off',
    'semi': 'off',
    'arrow-parens': 'off'
  }
}
