const browserSync = require('browser-sync').create();
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const handlebars = require('gulp-hb');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const sitemap = require('gulp-sitemap');
const webp = require('gulp-webp');
const webpack = require('webpack-stream');

const path = {
	'data': './src/data',
	'styles': './src/styles',
	'fonts': './src/fonts',
	'images': './src/images',
	'scripts': './src/scripts',
	'templates': './src/templates',
	'work': './src/templates/work',
	'files': './src/files'
}

const interval = 500;

gulp.task('styles', function() {
	return gulp
	.src([
		path.styles + '/index.scss'
	])
	.pipe(sass().on('error', sass.logError))
	// .pipe(csso())
	// .pipe(rename({ extname: '.min.css' }))
	.pipe(gulp.dest('./www/'))
});

gulp.task('scripts', function() {
	return gulp
	.src([
		path.scripts + '/index.js'
	])
	.pipe(webpack(require('./webpack.config.js')))
	.pipe(gulp.dest('./www/'));
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
		.pipe(htmlmin({
			removeComments: true
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
		path.images + '/**/*.{jpg,jpeg,png,gif,svg}'
	])
	.pipe(gulp.dest('./www/images'))
	.pipe(webp())
	.pipe(gulp.dest('./www/images'));
});

gulp.task('fonts', function() {
	return gulp
	.src([
		path.fonts + '/**/*.{eot,svg,ttf,woff,woff2}'
	])
	.pipe(gulp.dest('./www/fonts'));
});

gulp.task('files', () => {
	return gulp
	.src(path.files + '**/*')
    .pipe(gulp.dest('./www/'));
});

gulp.task('sitemap', function () {
    gulp.src('www/*.html', {
            read: false
        })
        .pipe(sitemap({
            siteUrl: 'http://www.menosketiago.com'
        }))
        .pipe(gulp.dest('./www/'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './www/'
        },
		open: false
    });
});

gulp.task('watch', function() {
	gulp.watch(
		path.styles + '/**/*.scss', {interval: interval}, ['styles']
	).on('change', browserSync.reload);
	gulp.watch(
		path.images + '/**/*', {interval: interval}, ['images']
	).on('change', browserSync.reload);
	gulp.watch(
		path.scripts + '/**/*.js', {interval: interval}, ['scripts']
	).on('change', browserSync.reload);
	gulp.watch(
		path.templates + '/**/*.hbs', {interval: interval}, ['templates']
	).on('change', browserSync.reload);
	gulp.watch(
		path.work + '/**/*.hbs', {interval: interval}, ['work']
	).on('change', browserSync.reload);
	gulp.watch(
		path.data + '/**/*.json', {interval: interval}, ['templates']
	).on('change', browserSync.reload);
	gulp.watch(
		path.files + '/**/*', {interval: interval}, ['files']
	).on('change', browserSync.reload);
});

gulp.task('clean', function() {
	return del(['./www/*']);
});

gulp.task('default', [
	'styles',
	'images',
	'fonts',
	'scripts',
	'templates',
	'work',
	'files',
	'sitemap'
]);

gulp.task('serve', [
	'default',
	'watch',
	'browser-sync'
]);
