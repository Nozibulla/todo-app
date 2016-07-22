/***** WARNING: ES5 code only here. Not transpiled! *****/

/**
 * External dependencies
 */
var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Internal dependencies
 */

/**
 * Internal variables
 */

webpackConfig = {
    /*entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'build.js'
	},*/
    entry: "./src/app.js",
    output: {
        filename: "./lib/app.js"
    },
    plugins: [ 
        new WebpackNotifierPlugin({alwaysNotify: true, title: 'Webpack'})
     ],
    module: {
		loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: __dirname + '/src',
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules')
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    }
};

module.exports = webpackConfig;
