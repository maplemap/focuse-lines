const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  settings: {
    react: {
      version: 'detect',
    }
  },
  env: {
    browser: true,
    jest: true,
    es6: true,
  },
  plugins: [
    'import'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/warnings',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? ERROR : WARNING,
    'no-eval': ERROR,
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': ERROR,
    'max-params': [ERROR, 3],
    'no-debugger': ERROR,
    'no-nested-ternary': ERROR,
    'object-shorthand': ERROR,
    'no-unused-vars': ERROR,
    'no-use-before-define': ERROR,
    'react/prop-types': OFF,
    'react/display-name': OFF,
    'import/no-anonymous-default-export': ERROR,
    'import/no-named-as-default': OFF,
  },
  overrides: [
    {
      files: ['*.js', '*.test.js'],
      env: {
        jest: true
      }
    }
  ],
}
