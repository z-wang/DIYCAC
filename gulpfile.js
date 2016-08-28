var gulp = require('gulp');

//var autoprefixer = require('gulp-autoprefixer');
var babel        = require('gulp-babel');
//var browserSync  = require('browser-sync');
var concat       = require('gulp-concat');
//var eslint       = require('gulp-eslint');
var filter       = require('gulp-filter');
//var newer        = require('gulp-newer');
var notify       = require('gulp-notify');
//var plumber      = require('gulp-plumber');
//var reload       = browserSync.reload;
//var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var newer        = require('gulp-newer');
var react       = require('gulp-react');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var jsFiles = {
    vendors: [
        'app/js/vendors/*.js'
    ],
    source: [
        'app/js/main.js'
    ]
};

// Lint JS/JSX files
//gulp.task('eslint', function() {
//    return gulp.src(jsFiles.source)
//        .pipe(eslint({
//            baseConfig: {
//                "ecmaFeatures": {
//                    "jsx": true
//                }
//            }
//        }))
//        .pipe(eslint.format())
//        .pipe(eslint.failAfterError());
//});

// Copy react.js and react-dom.js to assets/js/src/vendor
// only if the copy in node_modules is "newer"
//gulp.task('copy-react', function() {
//    return gulp.src('node_modules/react/dist/react.js')
//        .pipe(newer('app/js/vendors/react.js'))
//        .pipe(gulp.dest('app/js/vendors'));
//});
//
//gulp.task('copy-react-dom', function() {
//    return gulp.src('node_modules/react-dom/dist/react-dom.js')
//        .pipe(newer('app/js/vendors/react-dom.js'))
//        .pipe(gulp.dest('app/js/vendors'));
//});
//
//// Copy assets/js/vendor/* to assets/js
//gulp.task('copy-js-vendor', function() {
//    return gulp
//        .src([
//            'app/js/vendors/*'
//        ])
//        .pipe(gulp.dest('dist/js'));
//});

gulp.task('copy', function(){
    gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
    gulp.src('app/css/*.*')
        .pipe(gulp.dest('dist/css'));
    gulp.src('app/css/*/*.*')
        .pipe(gulp.dest('dist/css'));
    gulp.src('app/js/vendors/*')
        .pipe(gulp.dest('dist/js'));
    gulp.src('app/images/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('browserify', function(){
    return browserify('./app/js/main.js')
        .transform('reactify')
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        //.pipe(gulp.dest('dist/js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

 //Concatenate jsFiles.vendor and jsFiles.source into one JS file.
 //Run copy-react and eslint before concatenating
//gulp.task('concat', ['copy-react', 'copy-react-dom'], function() {
//    return gulp.src(jsFiles.vendor.concat(jsFiles.source))
//        .pipe(sourcemaps.init())
//        .pipe(babel({
//            only: [
//                'app/js/*.js'
//            ],
//            compact: true
//        }))
//        .pipe(concat('main.js'))
//        .pipe(sourcemaps.write('./'))
//        .pipe(gulp.dest('dist'));
//});

// Concatenate & Minify JS
//gulp.task('scripts', function() {
//    return gulp.src(jsFiles.source)
//        .pipe(sourcemaps.init())
//        .pipe(react())
//        .pipe(concat('main.js'))
//        .pipe(gulp.dest('dist'))
//        .pipe(rename('main.min.js'))
//        .pipe(uglify())
//        .pipe(sourcemaps.write('./'))
//        .pipe(gulp.dest('dist/js'));
//});








// Include Plugins
//var jshint = require('gulp-jshint');
//var sass = require('gulp-sass');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//var rename = require('gulp-rename');
//var nodemon = require('gulp-nodemon');
//var react = require('gulp-react');
//
//// Lint Task
//gulp.task('lint', function() {
//    return gulp.src('app/js/*.js')
//        .pipe(jshint())
//        .pipe(jshint.reporter('default'));
//});
//
//// Compile Our Sass
//gulp.task('sass', function() {
//    return gulp.src('app/scss/*.scss')
//        .pipe(sass())
//        .pipe(gulp.dest('dist/css'));
//});
//
//// Concatenate & Minify JS
//gulp.task('scripts', function() {
//    return gulp.src('app/js/*.js')
//        .pipe(react())
//        .pipe(concat('main.js'))
//        .pipe(gulp.dest('dist'))
//        .pipe(rename('main.min.js'))
//        .pipe(uglify())
//        .pipe(gulp.dest('dist/js'));
//});
//
//gulp.task('copy', function(){
//    gulp.src('app/index.html')
//        .pipe(gulp.dest('dist'));
//    gulp.src('app/css/*.*')
//        .pipe(gulp.dest('dist/css'));
//    gulp.src('app/js/vendors/*.*')
//        .pipe(gulp.dest('dist/js'));
//});
//
//gulp.task('start-app', function () {
//    nodemon({ script: 'server.js'
//        , ext: 'html js'
//        , ignore: ['ignored.js']
//        , tasks: ['lint'] })
//        .on('restart', function () {
//            console.log('restarted!')
//        })
//});
//
//// Watch Files For Changes
//gulp.task('watch', function() {
//    gulp.watch('app/js/*.js', ['lint', 'scripts']);
//    gulp.watch('app/scss/*.scss', ['sass']);
//});
//
//// Default Task
//gulp.task('default', ['lint', 'sass', 'scripts', 'copy', 'start-app']);
////gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
//
////gulp.task('default', function() {});

gulp.task('default', ['copy','browserify']);