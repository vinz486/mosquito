import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

module.exports = {
	plugins: [
		new UglifyJsPlugin({
			extractComments: /^\**!|@preserve/,
			warningsFilter : (src) => {
				return src.split('node_modules\\classnames').length === 1;
			}
		})
	]
};
