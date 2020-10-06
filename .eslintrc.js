module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },

  settings: {
    react: {
      version: 'detect',
    },
    'import/core-modules': ['@versum/react-native-markdown-input'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },

  extends: [
    'satya164',
    'plugin:react-native/all',
    'plugin:react-native-a11y/all',
  ],

  rules: {
    'babel/no-unused-expressions': 'off',
    'jest/consistent-test-it': ['error', { fn: 'test' }],
    'react-hooks/rules-of-hooks': 'error',
    'react-native/no-color-literals': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'generic',
        readonly: 'generic',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        jsxBracketSameLine: false,
        parser: 'typescript',
        printWidth: 80,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        useTabs: false,
      },
    ],
  },
};
