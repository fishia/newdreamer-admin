const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    configure: {
      output: {
        publicPath: process.env.NODE_ENV === 'production' ? '/nd/res/' : '/',
      },
    }

  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ]

};