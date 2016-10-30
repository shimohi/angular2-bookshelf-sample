// gulpfile.js

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');

gulp.task('scss', function() {
	var processors = [
		cssnext()
	];
	return gulp.src('src/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(gulp.dest('src'))
});
gulp.task('scss:watch', function () {
	gulp.watch('src/**/*.scss', ['scss']);
});