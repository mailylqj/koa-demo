const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const entrys = {};
const files = glob.sync('static/src/apps/app.tsx');
files.forEach((file) => {
	// const name = file.replace(/(.*\/)*([^.]+).*/ig, '$2');
	const name = file.replace(/static\/src\/(apps\/[^\*\@\&]+).tsx/ig, '$1');
	entrys[name] = path.resolve(file);
});

module.exports = {
	entry: entrys,
	output: {
		path: path.join(__dirname, '../dist'),
		filename: '[name].js',
		chunkFilename: 'vendor/[name].chunk.js',
		publicPath: '/dist/'
	},
	resolve: {
		extensions: ['.tsx', '.jsx', '.ts', '.js'],
		modules: [path.join(__dirname, '../src/'), 'node_modules'],
		alias: {
			'@': path.join(__dirname, '../src')
		}
	},
	devServer: { // 快速开发环境
		contentBase: path.join(__dirname, '../'),
		port: 3009,
		hot: true,
		inline: true,
		historyApiFallback: true,
		proxy: [{
			context: ['/ajax', '/ws'],
			target: 'http://localhost:8090/',
			ws: true
		}]
	},
	module: {
		rules: [{
			test: /\.(j|t)sx?$/,
			exclude: /node_modules/,
			use: ['happypack/loader?id=happybabel']
		},{
			test: /\.(sc|sa|le)ss$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader', {
					loader: 'postcss-loader',
					options: {
						config: {
							path: path.resolve(__dirname, './postcss.config.js')
						}
					}
				}, 
				{
					loader: 'less-loader',
					options: {
						javascriptEnabled: true
					}
				}
			]
		},{
			test: /\.(jpe?g|png|gif|svg)$/i,
			use: [{
				loader: 'file-loader',
				options: {
					outputPath: 'images',
				},
			}],
		}]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: 'vendor/[name].chunk.css'
		}),
		new HappyPack({
			id: 'happytsx',
			loaders: [{
				loader: 'ts-loader',
            	query: { happyPackMode: true, transpileOnly: true },
			}],
			threadPool: happyThreadPool,
			verbose: true
		}),
		new HappyPack({
			id: 'happybabel',
			loaders: [{
				loader: 'babel-loader',
            	options: {
					presets: [
						["@babel/preset-env", {
							targets: { ie: 9, },
							ignoreBrowserslistConfig: true,
							useBuiltIns: false,
							modules: false,
							exclude: ['transform-typeof-symbol'],
						}],
						["@babel/preset-react", {
							"targets": "last 2 versions, ie 11", "modules": false
						}],
						["@babel/preset-typescript"]
					],
					plugins: [
						'react-hot-loader/babel',
						['@babel/plugin-transform-runtime'],
						['@babel/plugin-proposal-decorators', { legacy: true }],
						['@babel/plugin-proposal-class-properties', { loose: true }],
						[
							'babel-plugin-import', {
								libraryName: 'antd',
								libraryDirectory: 'es',
                      			style: true
							}
						]
					]
				}
			}],
			threadPool: happyThreadPool,
			verbose: true
		})
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
			minChunks: 1,
			cacheGroups:{
				vendors: {
					test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
					name: 'react',
					chunks: 'all',
				},
				default: {
					test: /[\\/]node_modules\/antd[\\/]/,
					name: 'antd',
					priority: 0,
					chunks: "all"
				}
			}
		}
	}
};
