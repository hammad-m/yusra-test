module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "import",
    "simple-import-sort"
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  overrides: [
    {
      "files": [ "src/migrations/*.ts" ],
      "rules": {
        "quotes": "off",
      },
    }
  ],
  rules: {
    "@typescript-eslint/ban-types": [ "warn", {
      "types": {
        "{}": "Don't use `{}` as a type. `{}` actually means \"any non-nullish value\". Use the type EmptyObject instead.",
      },
    } ],
    "@typescript-eslint/consistent-type-imports": [ "warn", { "prefer": "type-imports" } ],
    "@typescript-eslint/member-delimiter-style": [ "warn", {
      "multiline": { "delimiter": "none" },
      "singleline": { "delimiter": "comma", "requireLast": false },
    } ],
    "@typescript-eslint/no-extra-non-null-assertion": [ "warn" ],
    "@typescript-eslint/no-empty-interface": [ "warn" ],
    "@typescript-eslint/no-explicit-any": [ "warn" ],
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-shadow": [ "warn" ],
    "@typescript-eslint/no-unused-vars": [ "warn" ],
    "@typescript-eslint/prefer-optional-chain": [ "warn" ],
    "@typescript-eslint/type-annotation-spacing": [ "warn" ],
    "array-bracket-spacing": [ "error", "always", { "arraysInArrays": true, "objectsInArrays": true, "singleValue": true } ],
    "arrow-parens": [ "error", "always" ],
    "arrow-spacing": [ "error", { "before": true, "after": true } ],
    "brace-style": [ "error", "1tbs", { "allowSingleLine": false } ],
    "camelcase": [ "error" ],
    "comma-spacing": [ "warn", { "before": false, "after": true } ],
    "computed-property-spacing": [ "warn", "always" ],
    "curly": [ "error", "all" ],
    "eslint-comments/no-unlimited-disable": "off",
    "generator-star-spacing": [ "warn", { "before": true, "after": false } ],
    "import/no-duplicates": [ "error", { "considerQueryString": true } ],
    "indent": [ "warn", 2, {
      "SwitchCase": 1,
      "ignoredNodes": [
        "PropertyDefinition[decorators]"
      ]
    } ],
    "key-spacing": [ "warn" ],
    "keyword-spacing": [ "warn", {
      "overrides": {
        "if": { "after": false },
        "catch": { "after": false },
        "for": { "after": false },
        "switch": { "after": false },
        "while": { "after": false },
      },
    } ],
    "no-case-declarations": "warn",
    "no-console": "error",
    "no-cond-assign": "error",
    "no-else-return": "error",
    "no-multi-spaces": "warn",
    "no-multiple-empty-lines": "warn",
    "no-restricted-imports": [ "error" ],
    "no-return-await": [ "error" ],
    "no-shadow": "off",
    "no-undef": "off",
    "no-unexpected-multiline": "warn",
    "no-unsafe-finally": "warn",
    "no-whitespace-before-property": "warn",
    "object-curly-spacing": [ "warn", "always", { "arraysInObjects": true, "objectsInObjects": true } ],
    "object-shorthand": [ "warn", "always" ],
    "operator-linebreak": [ "warn", "before" ],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "block-like", next: "*" },
      { blankLine: "always", prev: ["const"], next: "*" },
      { blankLine: "any",    prev: ["const"], next: ["const", "return"] },
      { blankLine: "always", prev: ["let"], next: "*" },
      { blankLine: "any",    prev: ["let"], next: ["let"] },
      { blankLine: "never", prev: ["case", "default"], next: "*" },
      { blankLine: "always", prev: "*", next: "block-like" },
    ],
    "prefer-const": "warn",
    "prettier/prettier": "off",
    "quotes": [ "warn", "double" ],
    "semi": [ "error", "always" ],
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
    "space-before-blocks": [ "warn", "always" ],
    "space-infix-ops": [ "error" ],
    "space-in-parens": [ "warn", "always", { "exceptions": [ "empty" ] } ],
    "space-unary-ops": [
      "warn",
      {
        "words": true,
        "nonwords": false,
        "overrides": {
          "!": true,
        },
      },
    ],
    "template-curly-spacing": [ "warn", "always" ],
    "yield-star-spacing": [ "warn", "after" ],
  },
};
