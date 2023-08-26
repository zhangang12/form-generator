const path = require('path')
const webpack = require('webpack')


const minify = process.env.NODE_ENV === 'development' ? false : {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  publicPath: './',
  pages: {
    index: {
      entry: 'src/views/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      minify
    },
    preview: {
      entry: 'src/views/preview/main.js',
      template: 'public/preview.html',
      filename: 'preview.html',
      chunks: ['chunk-vendors', 'chunk-common', 'preview'],
      minify
    }
  },
  devServer: {
    overlay: false,
    proxy: {
      '/ak': {
        target: 'https://pay.8888n.vip/api_proxy/user/api/recycle_data',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          "^/ak": ""
        },
        headers: {
          Referer: "https://pay.8888n.vip",
          Origin: "https://pay.8888n.vip",
          Cookie: "SESSID=6826a02e3bf2e3de0a836a36835703d5;token=495734d2f87f2926fac6f8518e878e5c3fd6ebe43dab8b6ce6d033a5da6e6ac5;userName=common;nickname=%E9%9B%BE%E9%9C%BE"
        },
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
          '@$': resolve('src'),
          'vue.esm$': 'vue/dist/vue.esm-bundler.js'
      }
    },
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    ],
    externals: {
      // vue: 'Vue',
      // 'vue-router': 'VueRouter',
      // vuex: 'Vuex',
      // 'ant-design-vue': 'antd',
      // moment: 'moment'
    }
  },
  chainWebpack(config) {
    // config.resolve.alias
    //   .set('@$', resolve('src'))
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  }
}
