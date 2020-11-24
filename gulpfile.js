const project_folder = 'dist';
const source_folder = '#src';
const path = {
	build: {
		html: project_folder + "/",
		css: project_folder + "/css/",
		libs: project_folder + "/libs/",
		js: project_folder + "/js/",
		img: project_folder + "/img/",
		fonts: project_folder + "/fonts/",
		icons: project_folder + "/svg/"
	},
	src: {
		html: source_folder + "/*.html",
		css: source_folder + "/scss/styles.scss",
		libs: source_folder + "/libs/*",
		js: [source_folder + "/js/*.js", "!" + source_folder + "/js/_*.js"],
		img: source_folder + "/img/**/*.{jpg,png,webp,svg,gif}",
		fonts: source_folder + "/fonts/*.ttf",
		icons: source_folder + "/svg/*.svg"
	},
	watch: {
		html: source_folder + "/**/*.html",
		css: source_folder + "/scss/**/*.scss",
		js: source_folder + "/js/**/*.js",
		img: source_folder + "/img/**/*.{jpg,png,webp,svg,gif}",
		icons: source_folder + "/svg/*.svg"
	},
	clean: './' + project_folder + "/"
};

const { src, dest } = require('gulp');
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const svgSprite = require('gulp-svg-sprite');
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2woff = require('gulp-ttf2woff');
const tinypng = require('gulp-tinypng-compress');

function browserSync() {
	browsersync.init({
		server: {
			baseDir: './' + project_folder + "/"
		},
		port: 3000,
		notify: false
	})
};

function html() {
	return src(path.src.html)
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function libs() {
	return src(path.src.libs)
		.pipe(dest(path.build.libs))
}

function css_dev() {
	return src(path.src.css)
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 5 versions'],
			cascade: true
		}))
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function js_dev() {
	return src(path.src.js)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}


function images_dev() {
	return src(path.src.img)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

async function images_build() {
	return src(path.src.img)
		.pipe(tinypng({
			key: 'wySvN73qbxdm3X5Lfq62lYYxwmrglfCb',
		}))
		.pipe(dest(path.build.img))
}

function svg() {
	return src(path.src.icons)
		.pipe(dest(path.build.icons))
		.pipe(browsersync.stream())
}

function fonts() {
	src(path.src.fonts)
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts))
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts))
}

function watchingFiles() {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css_dev);
	gulp.watch([path.watch.js], js_dev);
	gulp.watch([path.watch.img], images_dev);
	gulp.watch([path.watch.icons], svg);
}

function clean() {
	return del(path.clean);
}

const dev = gulp.series(clean, libs, fonts, images_dev, svg, gulp.parallel(html, css_dev, js_dev, watchingFiles, browserSync));
const build = gulp.series(clean, libs, fonts, images_build, svg, gulp.parallel(html, css_dev, js_dev));

exports.svg = svg;
exports.libs = libs;
exports.fonts = fonts;
exports.images_dev = images_dev;
exports.images_build = images_build;
exports.js_dev = js_dev;
exports.css_dev = css_dev;
exports.html = html;
exports.dev = dev;
exports.build = build;