var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	handlebars = require('gulp-hb'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync').create();

var path = {
	'bower': './bower_components',
	'styles': './src/styles',
	'scripts': './src/scripts',
	'templates': './src/templates',
	'images': './src/images',
	'fonts': './src/fonts'
}

gulp.task('styles', function() {
	return gulp
	.src([
		path.styles + '/base.scss'
	])
	.pipe(sass().on('error', sass.logError))
	// .pipe(concat('base.css'))
	.pipe(gulp.dest('./www/css'));
});

gulp.task('scripts', function() {
	return gulp
	.src([
		path.bower + '/modernizr/modernizr.js',
		path.bower + '/jquery/dist/jquery.min.js',
		path.scripts + '/index.js'])
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
		path.fonts + '/**/*.{eot,svg,ttf,woff}'
	])
	.pipe(gulp.dest('./www/fonts'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./www/"
        }
    });
});

gulp.task('watch', function() {
	gulp.watch(path.styles + '/**/*.scss', ['styles']).on('change', browserSync.reload);
	gulp.watch(path.scripts + '/**/*.js', ['scripts']).on('change', browserSync.reload);
	gulp.watch(path.templates + '/**/*.hbs', ['templates']).on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'scripts', 'templates', 'images', 'fonts']);

gulp.task('serve', ['default', 'browser-sync', 'watch']);
