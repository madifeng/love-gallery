/**
 * webpack 生成配置
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function join(p) {
	return path.join(__dirname, p);
}

module.exports = {
	entry: {
		app: join('../src/index.jsx'),
		vendor: ['react', 'react-dom', 'babel-polyfill']
	},
	output: {
		path: join('../dist'),
		filename: 'js/[name]_[chunkhash:7].js',
		publicPath: '/love-gallery/'
	},
	resolve: {
		extensions: ['.js', '.jsx', '*']
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			use: 'babel-loader',
			exclude: /node_modules/
		},
		{
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				use: ['css-loader', 'postcss-loader', 'less-loader']
			})
		},
		{
			test: /\.(png|gif|jpg|jpeg|bmp|woff|woff2|svg|ttf|eot|mp3)$/i,
			use : {
				loader : 'url-loader',
				options : {
					limit : '8192',
					name: 'assets/[name]_[hash:7].[ext]'
				}
			}
		}]
	},
	plugins: [
		new webpack.DefinePlugin({ 
			'process.env': {
				NODE_ENV: JSON.stringify('development') // 环境定义
			}
		}),
		new CleanWebpackPlugin(['../dist/'], {
			root: __dirname,
			verbose: true,
			allowExternal: true
		}),
		new HtmlWebpackPlugin({
			template: join('../src/index.html')
		}),
		new ExtractTextPlugin('css/main_[contenthash:6].css', {
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
};