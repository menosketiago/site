var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var path = {
	'bower': './bower_components',
	'assets': './assets',
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
	.pipe(gulp.dest('./public/css'));
});

gulp.task('scripts', function() {
	gulp.src([
		path.bower + '/jquery/dist/jquery.js',
		path.bower + '/foundation/js/foundation.js',
		path.bower + '/foundation/js/foundation/foundation.alert.js',
		path.assets + '/scripts/app.js'
	])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('./public/js'));

	return gulp.src(path.bower + '/modernizr/modernizr.js')
		.pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function() {
	gulp.watch(path.assets + '/styles/**/*.scss', ['styles']);
	gulp.watch(path.assets + '/scripts/**/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts']);