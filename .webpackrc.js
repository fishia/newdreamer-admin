import ENV from './src/utils/process.env'
var path = require('path')
export default {
  entry: 'src/index.js',
  html: {
    template: './public/index.ejs',
  },
  theme: {
    '@primary-color': '#468EFE',
  },
  proxy: {
    '/newdreamer/': {
      target: ENV.target,
      changeOrigin: true,
    },
  },
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: 'css' }, 'antd'],
    ['import', { libraryName: '@vtx/components', style: 'css' }, 'vtx-components'],
    [
      'import',
      { libraryName: 'lodash', libraryDirectory: '', camel2DashComponentName: false },
      'lodash',
    ],
    ['import', { libraryName: 'ahooks', camel2DashComponentName: false }, 'ahooks'],
  ],
  hash: true,
  ignoreMomentLocale: true,
  commons: [
    {
      async: 'common',
      children: true,
      minChunks: 5,
    },
    {
      async: 'lodash',
      children: true,
      minChunks: function (module) {
        return /lodash/.test(module.context)
      },
    },
    {
      async: 'moment',
      children: true,
      minChunks: function (module) {
        return /moment/.test(module.context)
      },
    },
    {
      async: 'antd',
      children: true,
      minChunks: function (module) {
        return /antd/.test(module.context)
      },
    },
    {
      name: 'manifest',
      minChunks: 'Infinity',
    },
  ],
  alias: {
    history: path.dirname(require.resolve('history/package.json')),
    moment: path.dirname(require.resolve('moment/package.json')),
    '@': path.resolve(__dirname, 'src'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@models': path.resolve(__dirname, 'src/models'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@routers': path.resolve(__dirname, 'src/routers'),
  },
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
    production: {
      extraBabelPlugins: ['transform-remove-console', '@babel/plugin-transform-runtime'],
    },
  },
}
