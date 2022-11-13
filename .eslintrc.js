module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'standard',
    "prettier"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
    "no-useless-constructor": "off",
    "no-new": "off",
    "camelcase": "off",
    "@typescript-eslint/no-explicit-any": [
      "off"
    ],
    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": ["error"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    'prettier/prettier': 'error',
    'object-curly-spacing': ['error', 'always'],
  }

}
