var gulp = require('gulp'),
    color = require('gulp-color'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    htmlmin = require('gulp-htmlmin'),
    del = require('del');

var dev = 'build/',
    dev_asciiworld = 'build/asciiworld',
    dev_dalek = 'build/dalek',
    dev_thechase = 'build/thechase',
    public_html = '../../public_html/',
    public_asciiworld = '../../public_html/asciiworld/',
    public_dalek = '../../public_html/asciiworld/',
    public_thechase = '../../public_html/asciiworld/';

gulp.task('default', function() {
    console.log(color('\n\n  ** ERROR **', 'RED'));
    console.log(color(' -> You need to select a task.', 'RED'));
    console.log(color('\n    Type: gulp <task name>', 'YELLOW'));
    console.log(color('\n  Available tasks:', 'CYAN'));
    console.log(color('      - unusual-dev', 'CYAN'));
    console.log(color('      - unusual-build', 'CYAN'));
    console.log('\n');
});


gulp.task('unusual-dev', ['dev-js', 'dev-js-libs-local', 'dev-js-libs-foreign', 'dev-css', 'dev-images', 'dev-fonts', 'dev-index']);
gulp.task('asciiworld-dev', ['dev-js', 'dev-css', 'dev-images', 'dev-fonts', 'dev-index']);

gulp.task('unusual-build', ['build-js', 'build-js-libs-local', 'build-js-libs-foreign', 'build-css', 'dev-images', 'dev-fonts', 'build-index']);
//gulp.task('')

gulp.task('unusual-injections', function() {
    gulp.src(dev+'index.html')
        .pipe(
            inject(
                gulp.src(
                    [
                        './build/js/*.js',
                        './build/js/libs/local/*.js',
                        './build/css/*.css'
                    ],
                    { read: false }
                ),
                {relative: true})
            )
        .pipe(gulp.dest(dev));
});


gulp.task('build-js', function() {
    del([dev+'js/*.js']);
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dev+'js/'));
});

gulp.task('build-js-libs-local', function() {
    del([dev+'js/libs/local/*']);
    gulp.src('js/libs/local/*.js')
        .pipe(uglify())
        .pipe(concat('locals.js'))
        .pipe(gulp.dest(dev+'js/libs/local/'));
});

gulp.task('build-js-libs-foreign', function() {
    del([dev+'js/libs/foreign/*']);
    gulp.src('js/libs/foreign/*.js')
        .pipe(uglify())
        .pipe(concat('foreigners.js'))
        .pipe(gulp.dest(dev+'js/libs/foreign/'));
});

gulp.task('build-css', function() {
    del([dev+'css/*']);
    gulp.src('css/*.css')
        .pipe(uglifycss())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(dev+'css/'));
});

gulp.task('dev-js', function() {
    del([dev+'js/*']);
    gulp.src('js/*.js')
        .pipe(gulp.dest(dev+'js/'));
});

gulp.task('dev-js-libs-local', function() {
    del([dev+'js/libs/local/*']);
    gulp.src('js/libs/local/*.js')
        .pipe(gulp.dest(dev+'js/libs/local/'));
});

gulp.task('dev-js-libs-foreign', function() {
    del([dev+'js/libs/foreign/*']);
    gulp.src('js/libs/foreign/*.js')
        .pipe(gulp.dest(dev+'js/libs/foreign/'));
});

gulp.task('dev-css', function() {
    del([dev+'css/*']);
    gulp.src('css/*.css')
        .pipe(gulp.dest(dev+'css/'));
});

gulp.task('dev-images', function() {
    del([dev+'img/*']);
    gulp.src('img/**/*')
        .pipe(gulp.dest(dev+'img/'));
});

gulp.task('dev-fonts', function() {
    del([dev+'font/*']);
    gulp.src('font/**/*')
        .pipe(gulp.dest(dev+'font/'));
});

gulp.task('dev-index', function () {
    del([dev+'index.html']);
    gulp.src('index.html')
        .pipe(gulp.dest(dev));
});

gulp.task('build-index', function () {
    del([dev+'index.html']);
    gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dev));
});
