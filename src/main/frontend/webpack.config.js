import fs          from 'fs';
import yaml        from 'js-yaml';
import path        from 'path';
import merge       from 'webpack-merge';
import yargs       from 'yargs';
import webpackDev  from './webpack.dev';
import webpackProd from './webpack.prod';


const {PATHS} = loadConfig();
const PRODUCTION = !!(yargs.argv.production);


function loadConfig() {
	let ymlFile = fs.readFileSync('config.yml', 'utf8');
	return yaml.load(ymlFile);
}

const config = !PRODUCTION ? webpackDev : webpackProd;
module.exports = merge(config, {
	output: {
		filename: PATHS.js,
		path: path.resolve(__dirname, PATHS.dist)
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [],
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},

	plugins: [],
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {}
	}
});
