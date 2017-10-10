// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

var args = require('minimist')(process.argv.slice(2));
module.exports = {
  build: {
    env: {
      NODE_ENV: '"production"',
      ENV_NAME: args.env ? `"${args.env}"` :'"production"'
    },
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: args.baseHref || '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: {
      NODE_ENV: '"development"',
      ENV_NAME: args.env ? `"${args.env}"` :'"development"'
    },
    port: 8000,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // proxy all requests starting with /api to jsonplaceholder
      // '/api': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true, // true时可用来解决跨域问题
      //   pathRewrite: {
      //     '^/api': ''
      //   }
      // }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
