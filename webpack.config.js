var webpack = require('webpack');
require('babel-loader');
require('json-loader');

module.exports = {
    entry: './src/keo.js',
    output: {
        path: __dirname + '/dist',
        filename: 'keo.js',
	    library: 'keo',
        libraryTarget: 'commonjs2'
    },
    externals: {
        'axios': true,
        'react-dom': true,
        'ramda': true,
        'react': true,
        'redux': true,
        'react-redux': true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                  presets: ['es2015', 'stage-0']
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};
