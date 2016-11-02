const enVars = require('./src/config/config')(process.env.NODE_ENV);
const gulp = require('gulp');
const clean = require('del');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');

const src = {root: './src/'};
const dist = {root: './dist/'};

src.sass = src.root + 'client/scss/*.scss'
dist.sass = dist.root + 'css';

src.bundle = src.root + 'client/javascript/main.js';
dist.bundle = dist.root + 'javascript'
src.bundleWatch = [
    './*js',
    src.root + '**/*.js',
    src.root + '**/*.ejs'
];

dist.clean = {
    sass: dist.sass + '/*.css',
    bundle: dist.bundle + '/*.js'
};

gulp.task('clean:sass', () => {
    return clean(dist.clean.sass);
});

gulp.task('sass', ['clean:sass'], () => {
    return gulp.src(src.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(dist.sass));
});

gulp.task('clean:bundle', () => {
    return clean(dist.clean.bundle);
});

gulp.task('bundleClient', ['clean:bundle'], () => {
    return browserify({
        entries: src.bundle,
        insertGlobals: true,
        debug: "production" !== process.env.NODE_ENV
    })
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(dist.bundle));
});

gulp.task('watch', () => {
    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.bundleWatch, ['bundleClient'])
});

gulp.task('default', [
    'sass',
    'bundleClient',
    'watch'
]);
