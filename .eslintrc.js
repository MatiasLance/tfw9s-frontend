module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jquery: true,
    jest: true,
  },
  ignorePatterns: [ 
    ".gitignore",
    "nuxt.config.js",
    ".eslintrc.js",
    "jsconfig.json",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs',
    'plugin:tailwindcss/recommended',
    'plugin:vue/base',
    // 'plugin:vue/essential',
    // 'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [
    'tailwindcss'
  ],
  // add your custom rules here
  rules: {
    // Core Eslint Rules
    "array-bracket-newline": [
      "error",
      {
        "multiline": true,
        "minItems": 3,
      }
    ],
    "array-bracket-spacing": [
      "error",
      "always",
      {
        "singleValue": true,
        "objectsInArrays": true,
        "arraysInArrays": true,
      }
    ],
    "arrow-spacing": [
      "error",
      {
        "before": true,
        "after": true,
      }
    ],
    "block-spacing": [
      "error",
      "always"
    ],
    "brace-style": [
      "error",
      "1tbs",
      {
        "allowSingleLine": false
      }
    ],
    "camelcase": [
      "error",
      {
        "properties": "always",
        "ignoreDestructuring": false,
        "ignoreImports": false,
        "ignoreGlobals": false,
      }
    ],
    "comma-dangle": [
      "error",
      {
        "arrays": "only-multiline",
        "objects": "only-multiline",
        "imports": "only-multiline",
        "exports": "only-multiline",
        "functions": "only-multiline",
      }
    ],
    "comma-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "comma-style": [
      "error",
      "last"
    ],
    "curly": [
      "error",
      "all"
    ],
    "default-case-last": "error",
    "func-call-spacing": [
      "error",
      "never"
    ],
    "indent": [
      "error",
      2
    ],
    "key-spacing": [
      "error",
      {
        "beforeColon": false,
        "afterColon": true,
        "mode": "strict",
      }
    ],
    "keyword-spacing": [
      "error",
      {
        "before": true,
        "after": true,
      }
    ],
    "max-len": [
      "error",
      {
        "code": 80,
        "tabWidth": 2,
        "comments": 80,
        "ignorePattern": "",
        "ignoreComments": false,
        "ignoreTrailingComments": false,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": false,
        "ignoreRegExpLiterals": true,
      }
    ],
    "multiline-comment-style": [
      "error",
      "starred-block"
    ],
    "newline-per-chained-call": [
      "error",
      {
        "ignoreChainWithDepth": 2,
      }
    ],
    "no-alert": "warn",
    "no-empty-function": "error",
    "no-duplicate-imports": "error",
    "no-floating-decimal": "error",
    "no-multi-spaces": [
      "error",
      {
        "ignoreEOLComments": true,
      }
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxEOF": 1,
        "maxBOF": 0,
      }
    ],
    "no-self-compare": "error",
    "no-shadow": [
      "error",
      {
        "allow": [
          "state"
        ]
      }
    ],
    "no-trailing-spaces": "error",
    "no-template-curly-in-string": "warn",
    "no-throw-literal": "error",
    "no-undef-init": "error",
    "no-undefined": "error",
    "no-underscore-dangle": [
      "error",
      {
        "enforceInMethodNames": false
      }
    ],
    "no-unused-expressions": "error",
    "no-useless-concat": "error",
    "no-useless-constructor": "error",
    "no-useless-return": "error",
    "no-whitespace-before-property": "error",
    "no-var": "error",
    "object-curly-newline": [
      "error",
      {
        "ObjectExpression": {
          "multiline": true,
          "minProperties": 3
        },
        "ObjectPattern": {
          "consistent": true
        },
        "ImportDeclaration": {
          "multiline": true,
          "minProperties": 3
        },
        "ExportDeclaration": {
          "multiline": true,
          "minProperties": 3
        },
      }
    ],
    "object-curly-spacing": [
      "error",
      "always",
      {
        "arraysInObjects": true,
        "objectsInObjects": true
      }
    ],
    "object-property-newline": "error",
    "object-shorthand": [
      "error",
      "always"
    ],
    "operator-linebreak": [
      "error",
      "after"
    ],
    "prefer-const": "error",
    "prefer-template": "error",
    "quotes": [
      "error",
      "single"
    ],
    "quote-props": [
      "error",
      "consistent"
    ],
    "semi-spacing": [
      "error",
      {
        "before": false,
        "after": true,
      }
    ],
    "semi-style": [
      "error",
      "last"
    ],
    "spaced-comment": [
      "error",
      "always"
    ],
    "space-before-blocks": [
      "error",
      "always",
    ],
    "space-before-function-paren": [
      "error",
      "never",
    ],
    "space-in-parens": [
      "error",
      "never"
    ],
    "switch-colon-spacing": "error",
    "template-curly-spacing": [
      "error",
      "never"
    ],
    "yoda": "error",

    // Vue Eslint Plugin 

    // Essentials
    "vue/multi-word-component-names": [
      "off",
      {
        "ignores": [
          "index"
        ]
      }
    ],

    // Strongly Recommended
    "vue/component-definition-name-casing": [
      "off",
    ],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        "singleline": "never",
        "multiline": "always",
      }
    ],
    "vue/singleline-html-element-content-newline": [
      "error",
      {
        "ignoreWhenNoAttributes": false,
        "ignoreWhenEmpty": true,
        // "ignores": ["pre", "textarea", ...INLINE_ELEMENTS]
      }
    ],
    "vue/component-tags-order": [
      "error",
      {
        "order": [
          "docs",
          "template",
          "script",
          "style",
        ]
      }
    ],
    // Uncategorized
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        "registeredComponentsOnly": false,
        "ignores": [
          "index"
        ]
      }
    ],
    "vue/component-options-name-casing": [
      "error",
      "PascalCase"
    ],
    "vue/custom-event-name-casing": [
      "error",
      "kebab-case",
    ],
    "vue/html-button-has-type": [
      "error",
      {
        "button": true,
        "submit": true,
        "reset": true,
      }
    ],
    "vue/html-comment-content-newline": [
      "error",
      {
        "singleline": "never",
        "multiline": "always",
      }
    ],
    "vue/html-comment-content-spacing": [ "error", "always" ],
    "vue/html-comment-indent": [
      "error",
      2
    ],
    "vue/match-component-file-name": [
      "error", {
        "extensions": [
          "js",
          "vue",
        ],
        "shouldMatchCase": true,
      }
    ],
    "vue/no-empty-component-block": [ "error" ],
    "vue/no-static-inline-styles": [
      "warn",
      {
        "allowBinding": false,
      }
    ],
    "vue/no-unused-properties": [ "error" ],
    "vue/no-unused-refs": [ "error" ],
    "vue/padding-line-between-blocks": [ "error" ],
    // Vue Extension Rules
    "vue/arrow-spacing": [
      "error",
      {
        "before": true,
        "after": true,
      }
    ],
    "vue/brace-style": [
      "error",
      "1tbs",
      {
        "allowSingleLine": false
      }
    ],
    "vue/camelcase": [
      "error",
      {
        "properties": "always",
        "ignoreDestructuring": false,
        "ignoreImports": false,
        "ignoreGlobals": false,
      }
    ],
    "vue/comma-dangle": [
      "error",
      {
        "arrays": "only-multiline",
        "objects": "only-multiline",
        "imports": "only-multiline",
        "exports": "only-multiline",
        "functions": "only-multiline",
      }
    ],
    "vue/comma-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "vue/func-call-spacing": [
      "error",
      "never"
    ],
    "vue/key-spacing": [
      "error",
      {
        "beforeColon": false,
        "afterColon": true,
        "mode": "strict",
      }
    ],
    "vue/max-len": [
      "error",
      {
        "code": 80,
        "template": 80,
        "tabWidth": 2,
        "comments": 80,
        "ignorePattern": "",
        "ignoreComments": false,
        "ignoreTrailingComments": false,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": false,
        "ignoreRegExpLiterals": true,
        "ignoreHTMLAttributeValues": false,
        "ignoreHTMLTextContents": false,
      }
    ],
    "vue/no-constant-condition": "error",
    "vue/no-empty-pattern": "error",
    "vue/no-irregular-whitespace": [
      "error",
      {
        "skipStrings": true
      }
    ],
    "vue/no-loss-of-precision": "error", // eslint-plugin-vue v8.0.0
    "vue/no-sparse-arrays": "error",
    "vue/object-curly-newline": [
      "error",
      {
        "ObjectExpression": {
          "multiline": true,
          "minProperties": 3
        },
        "ObjectPattern": {
          "consistent": true
        },
        "ImportDeclaration": {
          "multiline": true,
          "minProperties": 3
        },
        "ExportDeclaration": {
          "multiline": true,
          "minProperties": 3
        },
      }
    ],
    "vue/object-curly-spacing": [
      "error",
      "always",
      {
        "arraysInObjects": true,
        "objectsInObjects": true
      }
    ],
    "vue/object-property-newline": "error",
    "vue/object-shorthand": [ // eslint-plugin-vue v8.4.0
      "error",
      "always"
    ],
    "vue/quote-props": [ // eslint-plugin-vue v8.4.0
      "error",
      "consistent"
    ],
    "vue/space-in-parens": [
      "error",
      "never"
    ],
    "vue/template-curly-spacing": [
      "error",
      "never"
    ],

    // Tailwind Eslint Plugin Rules

    "tailwindcss/no-custom-classname": "off",
  },
}
