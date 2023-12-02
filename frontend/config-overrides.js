const path = require('path');
const {override, addWebpackAlias} = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, './src'),
    mixins: path.resolve(__dirname, './src/styles/mixins.scss'),
    fonts: path.resolve(__dirname, './src/styles/fonts.scss'),
    reset: path.resolve(__dirname, './src/styles/reset.scss'),
    variables: path.resolve(__dirname, './src/styles/variables.scss'),
    colors: path.resolve(__dirname, './src/styles/colors.scss'),
  }),
);
