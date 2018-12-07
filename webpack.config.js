/**
 * Created by 张伟 on 2018/11/7.
 */
'use strict'

//webpack4.x，取代extract-text-webpack-plugin
// const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const path=require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ExtractTextPluginCommonLess=new ExtractTextPlugin('common_[contenthash].css')
const ExtractTextPluginAppCss=new ExtractTextPlugin('app_[contenthash].css')
const ExtractTextPluginVendorCss=new ExtractTextPlugin('vendor_[contenthash].css')

//压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//压缩css
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpack = require('webpack')

module.exports={
  // mode: 'development',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      // '@': '../src',
    }
  },
  entry:{app:'./src/main.js'},
  output:{
    filename: "[name]_[chunkhash].js", //js文件会被分离成app/vendor，所以需要使用chunkhash
    path: path.resolve(__dirname,'own_dist') //打包文件输出路径
  },
  plugins: [
    //使用vue的生产版本
    //https://cn.vuejs.org/v2/guide/deployment.html
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    ExtractTextPluginCommonLess,//less-loader(将less变成css)->postcss（适应各种浏览器）->css-loader(从js中抽取出来)

    ExtractTextPluginVendorCss,
    ExtractTextPluginAppCss,//vue-loader（解析vue文件，转换成js）->css-loader（从js中抽取css）

    //压缩css
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true, } // map: { inline: false }  生产环境无需map
    }),

    //根据模板生成html，然后将webpack生成的文件（js/css）插入其中
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    //压缩js
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false,
      parallel: true
    }),
    //keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    //生成vendor
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, './node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    })
  ],
  module: {
    rules: [
/*      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }*/
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders:{
            css:ExtractTextPluginAppCss.extract({
              use: [{loader:'css-loader'}],
              fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
            })
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname,'src'), path.join(__dirname,'node_modules/webpack-dev-server/client')]
        /*use:[

          {
            loader: 'css-loader',
            exclude: /static/,//貌似只能处理和webpack.config.js同级的目录（css或者static/css都不行）。并且只能使用正则
          },
          {
            loader: 'babel-loader',
            include: [path.join(__dirname,'src'), path.join(__dirname,'node_modules/webpack-dev-server/client')]
          }
        ],*/

      },
      {
        test: /\.(png|jpeg|gif)$/,
        use:[
          {
            loader:'file-loader',
            options:{},
          }
        ]
      },

      {
        test:/\.css$/,
        use: ExtractTextPluginVendorCss.extract({
          // fallback: "vue-style-loader",
          use:[
            {
              loader:'css-loader',
            },
            ],
        }),
        exclude: /static/,//貌似只能处理和webpack.config.js同级的目录（css或者static/css都不行）。并且只能使用正则
        // exclude: path.join(__dirname,'static'), //此种写法无效
      },
      {
        test: /\.less$/,
        // use: ['css-loader','less-loader']
        use: ExtractTextPluginCommonLess.extract({
          // fallback: "vue-style-loader",
          use:[
            {
              loader:'css-loader',
              options: {
                // minimize: true// || {/* CSSNano Options *!/} //使用plugin OptimizeCSSPlugin
              },
              // exclude: /static/,//貌似只能处理和webpack.config.js同级的目录（css或者static/css都不行）。并且只能使用正则
            },
            {loader:'postcss-loader'},//为不同的浏览器加prefix
            {
              loader: 'less-loader',
              options: {
                // paths:['./public/stylesheets/private/'],//无需，直接在files中指定路径+文件名即可
                // rootPath:'./public/stylesheets/private/',//无需，直接在files中指定路径+文件名即可
                compress: false,
                strictImports: true,
                strictMath: false, //设成false，以便对px/color等可以进行运算
                strictUnits: false,//enable 3*5px=15px
                syncImport: true,
              }
            }
          ]
        }),
       },
      //采用file-loader将字体直接copy到指定目录
      {
        // test: /\.(svg|ttf|woff)\w*/,
        test: /\.(svg|ttf|woff)$/,
        loader: 'file-loader',
        options:{
          limit:1000000,
          // publicPath:path.resolve(__dirname,'own_dist'),
          outputPath:'font/',
          name: '[name].[hash].[ext]',
          // exclude:[/element-icons/]
        },
      },
      ]
      }


}
