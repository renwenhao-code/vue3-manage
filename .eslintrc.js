module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/typescript/recommended',
    'prettier' // 解决与 Prettier 的冲突
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 适配 Element Plus 的自定义规则（示例）
    'vue/no-unused-components': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn'
  }
}