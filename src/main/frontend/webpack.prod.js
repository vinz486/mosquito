import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

module.exports = {
	mode: 'production',
	plugins: [
		new UglifyJsPlugin({
			extractComments: /^\**!|@preserve/,
			warningsFilter : (src) => {
				return src.split('node_modules\\classnames').length === 1;
			}
		})
	]
};
