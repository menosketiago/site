var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	handlebars = require('gulp-hb'),
	rename = require('gulp-rename'),
	connect = require('gulp-connect');

var path = {
	'bower': './bower_components',
	'assets': './source',
	'templates': './source/templates'
};

gulp.task('styles', function() {
	return gulp.src([
		path.assets + '/styles/base.scss'
	])
	.pipe(sass({
		includePaths: [
			path.bower + '/foundation/scss'
		]
	}))
	.pipe(concat('base.css'))
	.pipe(gulp.dest('./build/css'));
});

gulp.task('scripts', function() {
	gulp.src([
		path.bower + '/jquery/dist/jquery.js',
		path.bower + '/foundation/js/foundation/foundation.js',
		path.bower + '/foundation/js/foundation/foundation.topbar.js',
		path.assets + '/scripts/base.js'
	])
	.pipe(concat('base.js'))
	.pipe(gulp.dest('./build/js'));

	return gulp.src(path.bower + '/modernizr/modernizr.js')
		.pipe(gulp.dest('./build/js'));
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
		.pipe(gulp.dest('./build'));
});

gulp.task('connect', function() {
	connect.server({
		root: './build',
		livereload: true,
		port: 6069
	});
});

gulp.task('watch', function() {
	gulp.watch(path.assets + '/styles/**/*.scss', ['styles']);
	gulp.watch(path.assets + '/scripts/**/*.js', ['scripts']);
	gulp.watch(path.templates + '/**/*.hbs', ['templates']);
});

gulp.task('default', ['styles', 'scripts', 'templates', 'connect', 'watch']);