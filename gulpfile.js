var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	handlebars = require('gulp-compile-handlebars'),
	rename = require('gulp-rename');

var path = {
	'bower': './bower_components',
	'node': './node_modules',
	'assets': './source',
	'templates': './source/templates'
};

gulp.task('styles', function() {
	return gulp.src([
		path.assets + '/styles/app.scss'
	])
	.pipe(sass({
		includePaths: [
			path.bower + '/foundation/scss'
		]
	}))
	.pipe(concat('app.css'))
	.pipe(gulp.dest('./build/css'));
});

gulp.task('scripts', function() {
	gulp.src([
		path.bower + '/jquery/dist/jquery.js',
		path.bower + '/foundation/js/foundation.min.js',
		path.assets + '/scripts/app.js'
	])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('./build/js'));

	return gulp.src(path.bower + '/modernizr/modernizr.js')
		.pipe(gulp.dest('./build/js'));
});

gulp.task('handlebars', function() {
	var options = {
		batch : [path.templates + '/partials']
	}

	gulp.src(path.templates + '/*.hbs')
		.pipe(handlebars(options))
		.pipe(rename(function(path) {
			path.extname = '.html';
		}))
		.pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
	gulp.watch(path.assets + '/styles/**/*.scss', ['styles']);
	gulp.watch(path.assets + '/scripts/**/*.js', ['scripts']);
	gulp.watch(path.templates + '/**/*.hbs', ['handlebars']);
});

gulp.task('default', ['styles', 'scripts', 'handlebars']);