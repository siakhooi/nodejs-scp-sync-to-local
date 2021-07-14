module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },

  rules: {
    'space-before-function-paren': 0
  }
}
