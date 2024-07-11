module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:nuxt/recommended", "plugin:vue/recommended", "plugin:prettier/recommended"],
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "no-console": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "vue/multiline-html-element-content-newline": "off",
    "vue/padding-line-between-blocks": ["error", "always"],
    "vue/multi-word-component-names": "off",
    "vue/script-indent": [
      "error",
      2,
      {
        baseIndent: 1,
        switchCase: 1,
        ignores: [],
      },
    ],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "import", next: "*" },
      { blankLine: "any", prev: "import", next: "import" },
      { blankLine: "always", prev: "*", next: "return" },
    ],
    "prettier/prettier": [
      "error",
      {
        arrowParens: "always",
        singleQuote: false,
      },
    ],
  },
};
