const gulp = require('gulp');
const sass = require('gulp-sass');
const handlebars = require('gulp-hb');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');

const path = {
	'data': './src/data',
	'styles': './src/styles',
	'scripts': './src/scripts',
	'templates': './src/templates',
	'work': './src/templates/work',
	'images': './src/images',
	'fonts': './src/fonts'
}

gulp.task('styles', function() {
	return gulp
	.src([
		path.styles + '/index.scss'
	])
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./www/styles'));
});

gulp.task('scripts', function() {
	return gulp
	.src([
		path.scripts + '/index.js'
	])
	.pipe(webpack(require('./webpack.config.js')))
	.pipe(gulp.dest('./www/scripts'));
});

gulp.task('templates', function () {
	return gulp
		.src([path.templates + '/*.hbs'])
		.pipe(handlebars({
			data: path.data + '/*.json',
			helpers: '',
			partials: path.templates + '/partials/**/*.hbs',
			bustCache: true
		}))
		.pipe(rename(function(path) {
			path.extname = '.html';
		}))
		.pipe(gulp.dest('./www'));
});

gulp.task('work', function () {
	return gulp
		.src([path.work + '/*.hbs'])
		.pipe(handlebars({
			data: '',
			helpers: '',
			bustCache: true
		}))
		.pipe(rename(function(path) {
			path.extname = '.html';
		}))
		.pipe(gulp.dest('./www/work/'));
});

gulp.task('images', function() {
	return gulp
	.src([
		path.images + '/**/*.{jpg,png,gif,svg}'
	])
	.pipe(gulp.dest('./www/images'));
});

gulp.task('fonts', function() {
	return gulp
	.src([
		path.fonts + '/**/*.{eot,svg,ttf,woff,woff2}'
	])
	.pipe(gulp.dest('./www/fonts'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./www/"
        },
		open: false
    });
});

gulp.task('watch', function() {
	gulp.watch(path.styles + '/**/*.scss', ['styles']).on('change', browserSync.reload);
	gulp.watch(path.scripts + '/**/*.js', ['scripts']).on('change', browserSync.reload);
	gulp.watch(path.templates + '/**/*.hbs', ['templates']).on('change', browserSync.reload);
	gulp.watch(path.data + '/**/*.json', ['templates']).on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'scripts', 'templates', 'work', 'images', 'fonts']);

gulp.task('serve', ['default', 'browser-sync', 'watch']);
