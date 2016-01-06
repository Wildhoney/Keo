require('babel-loader');
require('json-loader');

module.exports = {
    entry: {
        keo: ['./src/keo.js'],
        redux: ['./src/redux.js']
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
	library: "keo",
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            { 
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                  presets: ['es2015', 'stage-0'],
                  cacheDirectory: true
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};
