var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生产html插件
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry:{
        app:'./src/index.jsx',
        common:[
            'react',
            'react-dom',
            'react-router-dom',
            'whatwg-fetch'
        ]
    },
    output: {
        path:path.resolve(__dirname,'build'),
        publicPath:'./',
        filename: "./js/[name].js"
    },
    resolve:{
        extensions:[ '.js','.jsx'],
    },
    module:{
        rules:[
            //.jsx文件 babel-core babel-loader babel-preset-es2015 babel-preset-react
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{presets:['react','es2015']}
            },
            //.css 文件  style-loader css-loader postcss-loader
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader','postcss-loader'] })
            },
            {//处理less
                test: /\.less$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader','less-loader','postcss-loader'] })
            },
            {
                test:/\.(png|gif|jpg|jpeg|bmp)$/i,
                loader:'url-loader?limit=50&name=images/[name].[ext]'
            },
            {
                test:/\.(woff|woff2|svg|ttf|eot)($|\?)/i,
                loader:'url-loader?limit=500&name=fonts/[name].[ext]'
            }
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            "React": "react",
            "ReactDOM":'react-dom'
        }),

        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),

        new CommonsChunkPlugin({ //提取公共代码
            name: 'common',
            filename: './js/[name].js'
        }),
        //css 路径必须根目录，否则 font、img 路径错误
         new ExtractTextPlugin('css/[name].css'),
        // 定义为生产环境，编译 React 时压缩到最小

        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                //supresses warnings, usually from module minification
                warnings: false
            }
        }),
         new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'development') || 'false'))
        })
    ]
}
