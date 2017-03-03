var path    = require('path');
var webpack = require('webpack');
var React =  require('react');
var glob = require('glob');
var CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
/*var webpack = require('gulp-webpack');
var node_mudules_dir = path.resolve(__dirname, 'node_mudules');*/

var entry = {}, files = glob.sync('static/src/pages/*.js');
files.forEach(function(file){
	var name = file.replace(/(.*\/)*([^.]+).*/ig,"$2");
	//.replace(/(.*\/)*([^.]+).*/ig,"$2");  匹配文件名
	entry[name] = path.resolve(__dirname, file);
});

//console.log(path.resolve(__dirname, 'static/src/pages/*.js'))

module.exports = {
	plugins: [CommonsChunkPlugin],
	entry: {
		index: path.resolve(__dirname, "static/src/pages/index.js"),
		login: path.resolve(__dirname, "static/src/pages/login.js"),
		vendor: ['react', 'react-dom']
		//react: ['react']
	},
	output: {
		path: path.resolve(__dirname, 'static/dist/pages/'),
		filename: "[name].js"
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modules: [path.join(__dirname, './static/src/pages'), 'node_modules']
	},
	module: {
		loaders: [
			{ test: /\.(js|jsx)$/, loader: 'jsx-loader' },
			{ 
				test: /\.(es6|js|jsx)$/,
				exclude: /node_mudules/, 
				loader: 'babel', 
				query:
				{
					presets:['es2015', 'react']
				}
			}
		]
	}	
};