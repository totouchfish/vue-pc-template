module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'semi': [1, 'always'],
    'quotes': "off", // 引号类型 `` "" ''
    'no-console': 'off',
    'eqeqeq': 0, // 强制===
    'no-unused-vars': 0, // 允许 assigned a value but never used
    'camelcase': 'off', // 驼峰校验
    'vue/no-unused-components': 1,
    'no-undef': 0,
    'array-bracket-spacing': [2, 'never'],
    'block-spacing': [2, 'always'],
    'no-else-return': 1,
    'space-unary-ops': 2,
    // 关闭组件驼峰命名规定
    'vue/multi-word-component-names': 0,
  },
};