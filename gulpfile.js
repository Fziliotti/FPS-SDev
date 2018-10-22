var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();


// Options for production
var sassProdOptions = {
  outputStyle: 'compressed'
}

// Compile SASS
gulp.task('css:compile', function() {
  return gulp.src('./scss/main.scss')
  .pipe(sass(sassProdOptions).on('error', sass.logError))
  .pipe(gulp.dest('./css'));
});


// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
    './css/*.css',
    '!./css/*.min.css'
    ])
  .pipe(cleanCSS())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.stream());
});


// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
  	'!./js/*.min.js',
    './js/*.js'
    ])
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./js'))
  .pipe(browserSync.stream());
});


// TASKS SHORTCUTS
gulp.task('css', ['css:compile', 'css:minify']);
gulp.task('js', ['js:minify']);


// Default task, RUN GULP
gulp.task('default', ['css', 'js']);


// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./",
    }
  });
});

// Dev task
gulp.task('dev', ['css','browserSync'], function() {
  gulp.watch('./scss/*.scss', ['css']).on("change", browserSync.reload);
  // gulp.watch('./js/*.js', ['js']);
  gulp.watch('./*.html').on("change",browserSync.reload);
});
