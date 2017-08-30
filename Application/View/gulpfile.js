var gulp = require('gulp'),
    color = require('gulp-color'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    htmlmin = require('gulp-htmlmin');

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
    /*console.log(color('\n  Available tasks:', 'CYAN'));
    console.log(color('      - build-dev', 'CYAN'));
    console.log(color('      - build-prod', 'CYAN'));
    console.log(color('      - unusual', 'CYAN'));
    console.log(color('      - asciiword', 'CYAN'));
    console.log(color('      - dalek', 'CYAN'));
    console.log(color('      - thechase', 'CYAN'));*/
    console.log('\n');
});

gulp.task('build-dev', ['build-unusual-dev']);
gulp.task('build-prod', ['prod-js', 'prod-css', 'prod-images', 'dev-fonts', 'prod-index']);

gulp.task('unusual-dev', ['dev-js', 'dev-css', 'dev-images', 'dev-fonts', 'dev-index']);
gulp.task('build-unusual-dev', ['dev-min-js', 'dev-min-css', 'dev-images', 'dev-fonts', 'dev-min-index']);

gulp.task('dev-min-js', function() {
   gulp.src('js/*.js')
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest(dev+'js/'));
});

gulp.task('dev-min-css', function() {
   gulp.src('css/*.css')
      .pipe(uglifycss())
      .pipe(concat('styles.css'))
      .pipe(gulp.dest(dev+'css/'));
});

gulp.task('dev-js', function() {
   gulp.src('js/*.js')
      .pipe(gulp.dest(dev+'js/'));
});

gulp.task('dev-css', function() {
   gulp.src('css/*.css')
      .pipe(gulp.dest(dev+'css/'));
});

gulp.task('dev-images', function() {
    gulp.src('img/**/*.*')
        .pipe(gulp.dest(dev+'img/'));
});

gulp.task('dev-fonts', function() {
    gulp.src('font/**/*.*')
        .pipe(gulp.dest(dev+'font/'));
});

gulp.task('dev-index', function () {
    gulp.src('index.html')
        .pipe(gulp.dest(dev));
    gulp.src(dev+'index.html')
        .pipe(
            inject(
                gulp.src(['build/js/*.js', 'build/css/*.css'], { read: false }),
                {relative: true})
            )
        .pipe(gulp.dest(dev));
});

gulp.task('dev-min-index', function () {
    gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dev));
    gulp.src(dev+'index.html')
        .pipe(
            inject(
                gulp.src(['build/js/*.js', 'build/css/*.css'], { read: false }),
                {relative: true})
            )
        .pipe(gulp.dest(dev));
});
