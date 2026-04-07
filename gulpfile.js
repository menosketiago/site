const debug = require("gulp-debug").default;
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync").create();
const del = require("del");
const gulp = require("gulp");
const sharp = require("sharp");
const handlebars = require("gulp-hb");
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");
const sass = require("sass");
const gulpSass = require("gulp-sass")(sass);
const sitemap = require("gulp-sitemap");
const webpack = require("webpack-stream");
const concat = require("gulp-concat");

const path = {
    data: "./src/data",
    styles: "./src/styles",
    images: "./src/images",
    videos: "./src/videos",
    scripts: "./src/scripts",
    templates: "./src/templates",
    work: "./src/templates/work",
    pages: "./src/templates/pages",
    files: "./src/files",
};

const supportedImages = "/**/*.{jpg,jpeg,png,gif,svg,webp,avif}";

gulp.task("styles", function styles() {
    return gulp
        .src(path.styles + "/index.scss")
        .pipe(gulpSass().on("error", gulpSass.logError))
        .pipe(gulp.dest("./www/"))
        .pipe(browserSync.stream());
});

gulp.task("scripts", function scripts() {
    return gulp
        .src(path.scripts + "/index.js")
        .pipe(webpack(require("./webpack.config.js")))
        .pipe(gulp.dest("./www/"))
        .pipe(browserSync.stream());
});

gulp.task("templates", function templates() {
    return gulp
        .src(path.templates + "/*.hbs")
        .pipe(
            handlebars({
                data: path.data + "/*.json",
                helpers: "",
                partials: path.templates + "/partials/**/*.hbs",
                bustCache: true,
            }),
        )
        .pipe(
            htmlmin({
                removeComments: true,
            }),
        )
        .pipe(
            rename((path) => {
                path.extname = ".html";
            }),
        )
        .pipe(gulp.dest("./www"))
        .pipe(browserSync.stream());
});

gulp.task("work", function work() {
    return gulp
        .src(path.work + "/*.hbs")
        .pipe(
            handlebars({
                data: path.data + "/*.json",
                helpers: "",
                partials: path.templates + "/partials/**/*.hbs",
                bustCache: true,
            }),
        )
        .pipe(
            rename((path) => {
                path.extname = ".html";
            }),
        )
        .pipe(gulp.dest("./www/work/"))
        .pipe(browserSync.stream());
});

gulp.task("pages", function pages() {
    return gulp
        .src(path.pages + "/*.hbs")
        .pipe(
            handlebars({
                data: path.data + "/*.json",
                helpers: "",
                partials: path.templates + "/partials/**/*.hbs",
                bustCache: true,
            }),
        )
        .pipe(
            htmlmin({
                removeComments: true,
            }),
        )
        .pipe(
            rename((path) => {
                path.extname = ".html";
            }),
        )
        .pipe(gulp.dest("./www"))
        .pipe(browserSync.stream());
});

gulp.task("images", async function images() {
    const fs = require("fs").promises;
    const path_module = require("path");
    const globby = require("globby");

    const imageFiles = await globby([path.images + supportedImages]);

    for (const file of imageFiles) {
        try {
            const outputPath = path_module.join(
                "./www/images",
                path_module.relative(path.images, file),
            );
            const outputDir = path_module.dirname(outputPath);
            await fs.mkdir(outputDir, { recursive: true });
            await fs.copyFile(file, outputPath);
        } catch (err) {
            console.error(`[Image Error] ${file}: ${err.message}`);
        }
    }

    browserSync.reload();
});

gulp.task("webp", async function webpTask() {
    const fs = require("fs").promises;
    const path_module = require("path");
    const globby = require("globby");

    const imageFiles = await globby([
        path.images + "/**/*.jpg",
        path.images + "/**/*.jpeg",
        path.images + "/**/*.png",
        path.images + "/**/*.gif",
        "!" + path.images + "/_posters/**/*",
        "!" + path.images + "/pattern.png",
        "!" + path.images + "/favicon.png",
    ]);

    for (const file of imageFiles) {
        try {
            const outputPath = path_module.join(
                "./www/images",
                path_module
                    .relative(path.images, file)
                    .replace(/\.[^.]+$/, ".webp"),
            );
            const outputDir = path_module.dirname(outputPath);

            // Skip if output file already exists
            try {
                await fs.access(outputPath);
                continue; // File exists, skip conversion
            } catch {
                // File doesn't exist, proceed with conversion
            }

            await fs.mkdir(outputDir, { recursive: true });
            await sharp(file).webp({ quality: 80 }).toFile(outputPath);
        } catch (err) {
            console.error(`[WebP Error] ${file}: ${err.message}`);
        }
    }
});

gulp.task("avif", async function avifTask() {
    const fs = require("fs").promises;
    const path_module = require("path");
    const globby = require("globby");

    const imageFiles = await globby([
        path.images + "/**/*.jpg",
        path.images + "/**/*.jpeg",
        path.images + "/**/*.png",
        "!" + path.images + "/_posters/**/*",
        "!" + path.images + "/pattern.png",
        "!" + path.images + "/favicon.png",
    ]);

    for (const file of imageFiles) {
        try {
            const outputPath = path_module.join(
                "./www/images",
                path_module
                    .relative(path.images, file)
                    .replace(/\.[^.]+$/, ".avif"),
            );
            const outputDir = path_module.dirname(outputPath);

            // Skip if output file already exists
            try {
                await fs.access(outputPath);
                continue; // File exists, skip conversion
            } catch {
                // File doesn't exist, proceed with conversion
            }

            await fs.mkdir(outputDir, { recursive: true });
            await sharp(file).avif({ quality: 70 }).toFile(outputPath);
        } catch (err) {
            console.error(`[AVIF Error] ${file}: ${err.message}`);
        }
    }
});

gulp.task("videos", async function videos() {
    const fs = require("fs").promises;
    const path_module = require("path");
    const globby = require("globby");

    const videoFiles = await globby([
        path.videos + "/**/*.webm",
        path.videos + "/**/*.mp4",
    ]);

    for (const file of videoFiles) {
        try {
            const outputPath = path_module.join(
                "./www/videos",
                path_module.relative(path.videos, file),
            );
            const outputDir = path_module.dirname(outputPath);
            await fs.mkdir(outputDir, { recursive: true });
            await fs.copyFile(file, outputPath);
        } catch (err) {
            console.error(`[Video Error] ${file}: ${err.message}`);
        }
    }

    browserSync.reload();
});

gulp.task("files", function files() {
    return gulp
        .src(path.files + "/**/*")
        .pipe(gulp.dest("./www/files"))
        .pipe(browserSync.stream());
});

gulp.task("robots", function robots() {
    return gulp
        .src("./src/robots.txt")
        .pipe(gulp.dest("./www/"))
        .pipe(browserSync.stream());
});

gulp.task("sitemap", function sitemapTask() {
    return gulp
        .src("www/*.html", { read: false })
        .pipe(
            sitemap({
                siteUrl: "http://www.menosketiago.com",
            }),
        )
        .pipe(gulp.dest("./www/"))
        .pipe(browserSync.stream());
});

gulp.task("browser-sync", function browserSyncTask() {
    browserSync.init({
        server: "./www/",
        open: false,
        injectChanges: true,
        // Do not transpile or polyfill ES6 features, serve as-is
        serveStaticOptions: {
            extensions: [
                "js",
                "css",
                "html",
                "mp4",
                "webm",
                "jpg",
                "jpeg",
                "png",
                "gif",
                "svg",
                "avif",
                "webp",
                "eot",
                "ttf",
                "woff",
                "woff2",
            ],
        },
    });
});

gulp.task("watch", function watchTask(done) {
    gulp.watch(path.styles + "/**/*.scss", gulp.series("styles"));
    gulp.watch(path.scripts + "/**/*.js", gulp.series("scripts"));
    gulp.watch(path.templates + "/**/*.hbs", gulp.series("templates"));
    gulp.watch(path.work + "/**/*.hbs", gulp.series("work"));
    gulp.watch(path.pages + "/**/*.hbs", gulp.series("pages"));
    gulp.watch(path.images + supportedImages, gulp.series("images"));
    gulp.watch(path.images + "/**/*.{jpg,jpeg,gif,png}", gulp.series("webp"));
    gulp.watch(path.images + "/**/*.{jpg,png}", gulp.series("avif"));
    gulp.watch(path.videos + "/**/*.{webm,mp4}", gulp.series("videos"));
    gulp.watch(path.files + "/**/*", gulp.series("files"));
    gulp.watch("src/robots.txt", gulp.series("robots"));
    gulp.watch("www/*.html", gulp.series("sitemap"));
    done();
});

gulp.task("clean", function clean() {
    return del(["./www/*"]);
});

gulp.task("bundle-howler", function () {
    return gulp
        .src(["node_modules/howler/dist/howler.min.js"])
        .pipe(concat("howler.bundle.js"))
        .pipe(gulp.dest("./www/scripts"));
});

gulp.task(
    "default",
    gulp.parallel(
        "styles",
        "templates",
        "work",
        "pages",
        "bundle-howler",
        "scripts",
        "images",
        "webp",
        "avif",
        "files",
        "sitemap",
        "robots",
    ),
);

gulp.task(
    "serve",
    gulp.series(
        "default",
        gulp.parallel("browser-sync", "watch", "videos", "avif", "sitemap"),
    ),
);
