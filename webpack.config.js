const webpack = require('webpack'),
	path = require('path'),
	glob = require('glob'),
	BundleTracker = require('webpack-bundle-tracker'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	utils = require('./build/utils')

module.exports = { 
	
	context: __dirname,

	entry: utils.compileEntry('./build/src/*/!(_)*.*'),

	output: {
		path: path.join(__dirname, 'rhinorun/static'),
		filename: '[name]-[hash].js',
		publicPath: '/static/'
	},

	module: {
		rules: [
		{
			test: /\.js$/,
			use: [{
				loader: 'babel-loader',
				options: { presets: ['es2015', 'react'] }
			}],
		},
		{
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		},
		],
	},

	plugins: [
		new BundleTracker({filename: './webpack-stats.json'}),
		new ExtractTextPlugin('[name]-[hash].css'),
		new CopyWebpackPlugin([
			{ from: './build/src/js/component/*', to: './rhinorun/static/js/'}
		])
	],

	resolve: {
		descriptionFiles: ['package.json'],
		extensions: [
		'.js',
		'.css', '.scss', '.less',
		'.json', '.yml'
		],
	}
}
