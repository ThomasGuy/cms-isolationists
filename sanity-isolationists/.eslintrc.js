module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'wesbos',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {},
};
