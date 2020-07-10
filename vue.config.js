const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['> 1%, not dead']
          }),
          pxtorem({
            rootValue: 16,
            propList: ['*'],
          })
        ]
      }
    }
  },
  outputDir: 'dgov-admin-front',
  assetsDir: 'source',
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : './',
  devServer: {
    hot: true,
    historyApiFallback: true,
    host: "0.0.0.0",
    port: 9011,
    inline: true,
    stats: {
      errors: true,               //echo errors 
      warnings: false,            //not echo warnings
      modules: false,             //not echo modules info
      reasons: true,              //reason of import module
      performance: true,
      children: false
    }
  }
};