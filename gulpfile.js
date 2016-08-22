var gulp = require('gulp');

// Include Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var react = require('gulp-react');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('app/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
        .pipe(react())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function(){
    gulp.src('app/index.html')
        .pipe(gulp.dest('dist'));
    gulp.src('app/css/*.*')
        .pipe(gulp.dest('dist/css'));
    gulp.src('app/js/vendors/*.*')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('start-app', function () {
    nodemon({ script: 'server.js'
        , ext: 'html js'
        , ignore: ['ignored.js']
        , tasks: ['lint'] })
        .on('restart', function () {
            console.log('restarted!')
        })
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/js/*.js', ['lint', 'scripts']);
    gulp.watch('app/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'copy', 'start-app']);
//gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);

//gulp.task('default', function() {});

