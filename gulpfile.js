var enVars = require('./src/config/config')(process.env.NODE_ENV),
    gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass');

var src = {
        clientRoot: './src/client/',
        serverRoot: './src/server/'
    },
    dist = {
        clientRoot: './dist/client/',
        serverRoot: './dist/server/'
    };

src.sass = src.clientRoot + 'scss/*.scss'
dist.sass = dist.clientRoot + 'css';

src.bundleClient = src.clientRoot + 'javascript/main.js';
dist.bundleClient = dist.clientRoot + 'javascript'
src.bundleClientWatch = [
    './*js',
    src.clientRoot + '**/*.js',
    './*.html',
    src.clientRoot + '**/*.html'
];

src.views = src.serverRoot + 'views/*.ejs';
dist.views = dist.serverRoot + 'views';

gulp.task('sass', function () {
    return gulp.src(src.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(dist.sass));
});

gulp.task('bundleClient', function () {
    return browserify({
        entries: src.bundleClient,
        insertGlobals: true,
        debug: "production" !== process.env.NODE_ENV
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(dist.bundleClient));
});

gulp.task('views', function () {
    gulp.src(src.views)
        .pipe(gulp.dest(dist.views));
});

gulp.task('watch', function () {
    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.bundleClientWatch, ['bundleClient', 'views'])
});

gulp.task('default', [
    'sass',
    'bundleClient',
    'views',
    'watch'
]);
