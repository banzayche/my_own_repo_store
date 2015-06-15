// reloading with gulp-connect server

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    csscomb = require('gulp-csscomb'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint');



// ---------------CSS TASKS--------------------------------------------------------------------------
gulp.task('cssconcatinate', function() {
  gulp.src('public/**/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('public/css'));
    
    setTimeout(function(){
        return gulp.run('csscombination');
    }, 500);
});

gulp.task('csscombination', function () {
  gulp.src('public/css/all.css')
    .pipe(csscomb())
    .pipe(gulp.dest('public/css'));

    setTimeout(function(){
        return gulp.run('cssminification');
    }, 500);
});

gulp.task('cssminification', function () {
    gulp.src('public/css/all.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/css'));
});

gulp.task('csstask', function(){
    gulp.run('cssconcatinate');
});



// ---------------JS TASKS---------------------------------------------------------------------------
gulp.task('hint', function() {
  return gulp.src('public/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('concatinate', function() {
    gulp.src('public/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('public/js'));
    
    setTimeout(function(){
        return gulp.run('compress');
    }, 500);
});

gulp.task('compress', function() {
  return gulp.src('public/js/all.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/js'));
});

gulp.task('jstask', function(){
    gulp.run('hint', 'concatinate');
});



// ---------------GULP WATCH---------------------------------------------------------------------------
gulp.task('stream', function () {
    gulp.src('public/css/*.css')
         .pipe(watch('public/css/*.css'))
         .pipe(connect.reload());

    gulp.src('public/js/*.js')
         .pipe(watch('public/js/*.js'))
         .pipe(connect.reload());

    gulp.src('public/*.html')
         .pipe(watch('public/*.**'))
         .pipe(connect.reload());
});


// -------------------SERVER-LIVERELOAD-----------------------------------------------
gulp.task('connect', function(){
    connect.server({
        root: 'public',
        livereload: true
    });    
});


// ---------------DEFAULT---------------------------------------------------------------------------
gulp.task('default', ['stream', 'connect']);