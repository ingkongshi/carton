var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var fetch = require('node-fetch');
module.exports = {
    entry:{
		app:"./src/index.jsx",
		commons: [   //   写包的名字
			'react',
			'react-dom',
			'react-router-dom'
		]

	},	
    output: {
        path: path.resolve(__dirname,'build'),
        filename:"./js/[name].js"
    },
    module:{
        rules:[
            //.css 文件  style-loader css-loader postcss-loader
            {
                test:/\.css$/,
//              exclude:/node_modules/,
                loader:"style-loader!css-loader!postcss-loader"
            },
             { 
             	test:/\.less$/, 
             	loader: 'style-loader!css-loader!less-loader!postcss-loader'
             },
            //.jsx文件 babel-core babel-loader babel-preset-es2015 babel-preset-react
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                loader:"babel-loader",
                query:{presets:['react','latest']}
            },
            {
                test: /\.(png|jpg|gif|jpeg|bmp)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=10000&name=build/images/[name].[ext]'
            },
            {
                test:/\.(woff|woff2|svg|ttf|eot)($|\?)/i,
                loader:'url-loader?limit=500000'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.tmpl.html",
            hash:true
        }),
        new webpack.ProvidePlugin({
            "React": "react",
            "ReactDOM":'react-dom'
        }),
        // 自动打开浏览器
//      new OpenBrowserPlugin({
//          url: 'http://localhost:8080'
//      }),
        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),
    	new CommonsChunkPlugin({ //提取公共代码
        name: 'common',
        filename: './js/[name].js'
	    }),
	    new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'development') || 'false'))
        }),
    ],
    devServer:{
        inline: true, //实时刷新
        port:8080,  //端口8080
        proxy: {
  			"/api.php": "http://localhost/manhua/api.php"
		}
    },
    
}
