'use strict';
import browser from 'browser-sync';
import fs from 'fs';
import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import notify from 'gulp-notify';
import postcss from 'gulp-postcss';
import yaml from 'js-yaml';
import rimraf from 'rimraf';
import named from 'vinyl-named';
import webpackVersion from 'webpack';
import webpackStream from 'webpack-stream';
import yargs from 'yargs';
import webpackDevConfig from './webpack.config';
// Load all Gulp plugins into one variable
const $                            = plugins();
// Check for --production flag
const PRODUCTION                   = !!(yargs.argv.production);
// Load settings from settings.yml
const {COMPATIBILITY, PORT, PATHS} = loadConfig();

function loadConfig() {
	let ymlFile = fs.readFileSync('config.yml', 'utf8');
	return yaml.load(ymlFile);
}

gulp.task('build', gulp.series(clean, gulp.parallel(javascript, copy, images), sass));
gulp.task('default', gulp.series('build', server, watch));
gulp.task('dev-no-server', gulp.series('build', watch));
gulp.task('server', server);
gulp.task('js', gulp.series(clean, javascript));
gulp.task('css', gulp.series(clean, sass));
gulp.task('images', images);
gulp.task('clean', clean);

function copy() {
	return gulp.src(PATHS.assets, {base: './src/'})
			   .pipe(gulp.dest(PATHS.dist));
}

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
	rimraf(PATHS.dist, done);
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
	const processors = [];
	return gulp.src('src/stylesheets/main.scss')
			   .pipe($.sourcemaps.init())
			   .pipe($.sass({includePaths: PATHS.sass}).on('error', $.sass.logError))
			   .pipe($.autoprefixer({browsers: COMPATIBILITY}))
			   .pipe($.if(PRODUCTION, $.cleanCss({compatibility: '*'})))
			   .pipe(postcss(processors))
			   .pipe($.if(!PRODUCTION, $.sourcemaps.write('.')))
			   .pipe(gulp.dest(PATHS.dist + '/stylesheets'))
			   .pipe(browser.reload({stream: true}))
			   .pipe(notify({message: 'Css compilato correttamente', onLast: true}));
}

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
	return gulp.src(PATHS.entries)
			   .pipe(named())
			   .pipe($.sourcemaps.init({loadMaps: true}))
			   .pipe(webpackStream(webpackDevConfig, webpackVersion))
			   .pipe($.if(!PRODUCTION, $.sourcemaps.write('.')))
			   .pipe(gulp.dest(PATHS.dist + '/js'))
			   .pipe(notify({
				   message: 'Javascript compilato correttamente',
				   onLast : true
			   }));
}

function images() {
	return gulp.src('src/img/**/*')
			   .pipe($.imagemin([
				   $.imagemin.svgo({
					   plugins: [
						   {removeViewBox: false}
					   ]
				   })
			   ]))
			   .pipe(gulp.dest(PATHS.dist + '/img'))
			   .pipe(notify({
				   message: 'Immagini ottimizzate', onLast: true
			   }));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
	browser.init({
		server: PATHS.dist, port: PORT
	});
	done();
}

// Reload the browser with BrowserSync
function reload(done) {
	browser.reload();
	done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
	gulp.watch('src/stylesheets/**/*.scss').on('change', sass);
	gulp.watch('src/js/**/*.js').on('change', gulp.series(javascript, reload));
	gulp.watch('src/img/**/*.(jpg|gif|svg|png)').on('change', gulp.series(images, reload));
}
