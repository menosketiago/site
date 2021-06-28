const browserSync = require('browser-sync').create();
const del = require('del');
const gulp = require('gulp');
const gulpAvif = require('gulp-avif');
const handlebars = require('gulp-hb');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sitemap = require('gulp-sitemap');
const webp = require('gulp-webp');
const webpack = require('webpack-stream');

const path = {
	'data': './src/data',
	'styles': './src/styles',
	'fonts': './src/fonts',
	'images': './src/images',
	'videos': './src/videos',
	'scripts': './src/scripts',
	'templates': './src/templates',
	'work': './src/templates/work',
	'files': './src/files'
}

const supportedImages = '/**/*.{jpg,jpeg,png,gif,svg,webp,avif}';

gulp.task('styles', () => {
	return gulp
		.src(path.styles + '/index.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./www/'))
		.pipe(browserSync.stream())
});

gulp.task('scripts', () => {
	return gulp
		.src(path.scripts + '/index.js')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('./www/'))
		.pipe(browserSync.stream())
});

gulp.task('templates', () => {
	return gulp
		.src(path.templates + '/*.hbs')
		.pipe(handlebars({
			data: path.data + '/*.json',
			helpers: '',
			partials: path.templates + '/partials/**/*.hbs',
			bustCache: true
		}))
		.pipe(htmlmin({
			removeComments: true
		}))
		.pipe(rename((path) => {
			path.extname = '.html';
		}))
		.pipe(gulp.dest('./www'))
		.pipe(browserSync.stream())
});

gulp.task('work', () => {
	return gulp
		.src(path.work + '/*.hbs')
		.pipe(handlebars({
			data: path.data + '/*.json',
			helpers: '',
			partials: path.templates + '/partials/**/*.hbs',
			bustCache: true
		}))
		.pipe(rename((path) => {
			path.extname = '.html';
		}))
		.pipe(gulp.dest('./www/work/'))
		.pipe(browserSync.stream())
});

gulp.task('images', () => {
	return gulp
		.src(path.images + supportedImages)
		.pipe(gulp.dest('./www/images'))
		.pipe(browserSync.stream())
});

gulp.task('webp', () => {
	return gulp
		.src(path.images + supportedImages)
		.pipe(webp())
		// .pipe(rename((path) => {
		// 	path.extname = '.webp';
		// }))
		.pipe(gulp.dest('./www/images'))
		.pipe(browserSync.stream())
});

gulp.task('avif', () => {
	return gulp
		.src(path.images + '/**/*.{png}')
		.pipe(gulpAvif())
		// .pipe(rename((path) => {
		// 	path.extname = '.avif';
		// }))
		.pipe(gulp.dest('./www/images'))
		.pipe(browserSync.stream())
	done();
});

gulp.task('videos', () => {
	return gulp
		.src(path.videos + '/**/*.{webm,mp4}')
		.pipe(gulp.dest('./www/videos'))
});

gulp.task('fonts', () => {
	return gulp
		.src(path.fonts + '/**/*.{eot,svg,ttf,woff,woff2}')
		.pipe(gulp.dest('./www/fonts'))
		.pipe(browserSync.stream())
});

gulp.task('files', () => {
	return gulp
		.src(path.files + '**/*')
		.pipe(gulp.dest('./www/'))
		.pipe(browserSync.stream())
});

gulp.task('sitemap', () => {
    return gulp
		.src('www/*.html', { read: false })
		.pipe(sitemap({
			siteUrl: 'http://www.menosketiago.com'
		}))
		.pipe(gulp.dest('./www/'))
		.pipe(browserSync.stream())
});

gulp.task('browser-sync', (done) => {
    browserSync.init({
        server: './www/',
		open: false,
		injectChanges: true
    });
	done();
});

gulp.task('watch', (done) => {
	gulp.watch(path.styles + '/**/*.scss', gulp.series('styles'));
	gulp.watch(path.scripts + '/**/*.js', gulp.series('scripts'));
	gulp.watch(path.templates + '/**/*.hbs', gulp.series('templates'));
	gulp.watch(path.work + '/**/*.hbs', gulp.series('work'));
	gulp.watch(path.images + supportedImages, gulp.series('images'));
	gulp.watch(path.images + '/**/*.{png}', gulp.series('webp'));
	gulp.watch(path.images + '/**/*.{png}', gulp.series('avif'));
	gulp.watch(path.videos + '/**/*.{webm,mp4}', gulp.series('videos'));
	gulp.watch(path.fonts + '/**/*.{eot,svg,ttf,woff,woff2}', gulp.series('fonts'));
	gulp.watch(path.files + '/**/*', gulp.series('files'));
	gulp.watch('www/*.html', gulp.series('sitemap'));
	done();
});

gulp.task('clean', () => {
	return del(['./www/*']);
});

gulp.task('default',
	gulp.parallel(
		'fonts',
		'styles',
		'templates',
		'work',
		'scripts',
		'images',
		'webp',
		'avif',
		'files',
		'sitemap'
	)
);

gulp.task('serve',
	gulp.series(
		'default',
		'browser-sync',
		'watch',
		'videos'
	),
);
