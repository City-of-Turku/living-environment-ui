const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssModulesDev = '?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]';
const cssModulesProd = '?modules&-autoprefixer&importLoaders=1';
module.exports = {
  BABEL_STAGE_0: {
    toArray: 'presets',
    getDev() {
      return require.resolve('babel-preset-stage-0');
    },
  },
  LESS: {
    toArray: 'loaders',
    fileRegex: /\.global\.less$/,
    getDev() {
      return {
        test: /\.global\.less$/,
        loader: 'style!css!postcss!less',
      };
    },
    getProd() {
      return {
        test: /\.global\.less/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!less'),
      };
    },
  },
  LESS_MODULES: {
    toArray: 'loaders',
    fileRegex: /^((?!\.global).)*less$/,
    getDev() {
      return {
        test: /^((?!\.global).)*less$/,
        loader: `style!css${cssModulesDev}!postcss!less`,
      };
    },
    getProd() {
      return {
        test: /^((?!\.global).)*less$/,
        loader: ExtractTextPlugin.extract('style', `css${cssModulesProd}!postcss!less`),
      };
    },
  },
  CSS_MODULES: {
    config: {
      dev: 'style!css?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss',
      prod: 'style!css?modules&camelCase&-autoprefixer&importLoaders=1!postcss',
    },
  },
};
