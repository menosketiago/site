const browserSync = require('browser-sync').create();
const del = require('del');
const gulp = require('gulp');
const gulpAvif = require('gulp-avif');
const handlebars = require('gulp-hb');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const sass = require('sass');
const gulpSass = require('gulp-sass')(sass);
const sitemap = require('gulp-sitemap');
const webp = require('gulp-webp'); // Ensure gulp-webp is installed
const webpack = require('webpack-stream');

const path = {
    data: './src/data',
    styles: './src/styles',
    fonts: './src/fonts',
    images: './src/images',
    videos: './src/videos',
    scripts: './src/scripts',
    templates: './src/templates',
    work: './src/templates/work',
    pages: './src/templates/pages',
    files: './src/files'
};

const supportedImages = '/**/*.{jpg,jpeg,png,gif,svg,webp,avif}';

gulp.task('styles', function styles() {
    return gulp
        .src(path.styles + '/index.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulp.dest('./www/'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function scripts() {
    return gulp
        .src(path.scripts + '/index.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./www/'))
        .pipe(browserSync.stream());
});

gulp.task('templates', function templates() {
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
        .pipe(browserSync.stream());
});

gulp.task('work', function work() {
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
        .pipe(browserSync.stream());
});

gulp.task('pages', function pages() {
    return gulp
        .src(path.pages + '/*.hbs')
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
        .pipe(browserSync.stream());
});

gulp.task('images', function images() {
    return gulp
        .src(path.images + supportedImages)
        .pipe(gulp.dest('./www/images'));
});

gulp.task('webp', function webpTask() {
    return gulp
        .src(path.images + '/**/*.{jpg,jpeg,png,gif}')
        .pipe(webp())
        .pipe(rename((path) => {
            path.extname = '.webp';
        }))
        .pipe(gulp.dest('./www/images'));
});

gulp.task('avif', function avifTask() {
    return gulp
        .src(path.images + '/**/*.{jpg,png}')
        .pipe(gulpAvif())
        .pipe(rename((path) => {
            path.extname = '.avif';
        }))
        .pipe(gulp.dest('./www/images'));
});

gulp.task('videos', function videos() {
    return gulp
        .src(path.videos + '/**/*.{webm,mp4}')
        .pipe(gulp.dest('./www/videos'));
});

gulp.task('fonts', function fonts() {
    return gulp
        .src(path.fonts + '/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest('./www/fonts'))
        .pipe(browserSync.stream());
});

gulp.task('files', function files() {
    return gulp
        .src(path.files + '/**/*')
        .pipe(gulp.dest('./www/files'))
        .pipe(browserSync.stream());
});

gulp.task('robots', function robots() {
    return gulp
        .src('./src/robots.txt')
        .pipe(gulp.dest('./www/'))
        .pipe(browserSync.stream());
});

gulp.task('sitemap', function sitemapTask() {
    return gulp
        .src('www/*.html', { read: false })
        .pipe(sitemap({
            siteUrl: 'http://www.menosketiago.com'
        }))
        .pipe(gulp.dest('./www/'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function browserSyncTask() {
    browserSync.init({
        server: './www/',
        open: false,
        injectChanges: true
    });
});

gulp.task('watch', function watchTask(done) {
    gulp.watch(path.styles + '/**/*.scss', gulp.series('styles'));
    gulp.watch(path.scripts + '/**/*.js', gulp.series('scripts'));
    gulp.watch(path.templates + '/**/*.hbs', gulp.series('templates'));
    gulp.watch(path.work + '/**/*.hbs', gulp.series('work'));
    gulp.watch(path.pages + '/**/*.hbs', gulp.series('pages'));
    gulp.watch(path.images + supportedImages, gulp.series('images'));
    gulp.watch(path.images + '/**/*.{jpg,jpeg,gif,png}', gulp.series('webp'));
    gulp.watch(path.images + '/**/*.{jpg,png}', gulp.series('avif'));
    gulp.watch(path.videos + '/**/*.{webm,mp4}', gulp.series('videos'));
    gulp.watch(path.fonts + '/**/*.{eot,svg,ttf,woff,woff2}', gulp.series('fonts'));
    gulp.watch(path.files + '/**/*', gulp.series('files'));
    gulp.watch('src/robots.txt', gulp.series('robots'));
    gulp.watch('www/*.html', gulp.series('sitemap'));
    done();
});

gulp.task('clean', function clean() {
    return del(['./www/*']);
});

gulp.task('default',
    gulp.parallel(
        'fonts',
        'styles',
        'templates',
        'work',
        'pages',
        'scripts',
        'images',
        'webp',
        'files',
        'sitemap',
        'robots'
    )
);

gulp.task('serve',
    gulp.parallel(
        'default',
        'browser-sync',
        'watch',
        'videos',
        'avif'
    )
);