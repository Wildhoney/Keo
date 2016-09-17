'use strict';

var rollup = require('rollup').rollup;
var babel = require('rollup-plugin-babel');

module.exports = {
	entry: 'src/keo.js',
	format: 'cjs',
	plugins: [
		babel()
	],
	dest: 'dist/keo.js'
};
