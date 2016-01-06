require('babel-loader');

module.exports = {
    entry: './src/keo.js',
    output: {
        path: __dirname + '/dist',
        filename: 'keo.js',
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
            }
        ]
    }
};

