var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	handlebars = require('gulp-hb'),
	rename = require('gulp-rename'),
	connect = require('gulp-connect');

var path = {
	'bower': './bower_components',
	'assets': './src',
	'templates': './src/templates',
	'resources': './src/resources'
}

gulp.task('styles', function() {
	return gulp.src([
		path.assets + '/styles/base.scss'
	])
	.pipe(concat('base.css'))
	.pipe(gulp.dest('./www/css'));
});

gulp.task('scripts', function() {
	gulp.src([
		path.bower + '/jquery/dist/jquery.js',
		path.assets + '/scripts/base.js'
	])
	.pipe(concat('base.js'))
	.pipe(gulp.dest('./www/js'));

	return gulp.src(path.bower + '/modernizr/modernizr.js')
		.pipe(gulp.dest('./www/js'));
});

gulp.task('templates', function () {
	return gulp
		.src(path.templates + '/*.hbs')
		.pipe(handlebars({
			data: '',
			helpers: '',
			partials: path.templates + '/partials/**/*.hbs',
			bustCache: true
		}))
		.pipe(rename(function(path) {
			path.extname = '.html';
		}))
		.pipe(gulp.dest('./www'));
});

gulp.task('resources', function() {
	return gulp.src([
		path.resources + '/**/*.{jpg,png,gif,svg}'
	])
	.pipe(gulp.dest('./www/resources'));
});

gulp.task('connect', function() {
	connect.server({
		root: './www',
		port: 6069
	});
});

gulp.task('watch', function() {
	gulp.watch(path.assets + '/styles/**/*.scss', ['styles']);
	gulp.watch(path.assets + '/scripts/**/*.js', ['scripts']);
	gulp.watch(path.templates + '/**/*.hbs', ['templates']);
});

gulp.task('default', ['styles', 'scripts', 'templates', 'resources']);

gulp.task('serve', ['connect', 'watch']);
