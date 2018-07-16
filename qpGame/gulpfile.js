


var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify');

// Load plugins
var $ = require('gulp-load-plugins')();

var SRC_DIR = './src/**/*.js';
var DIST_DIR = './dist/';

/* es6 */
gulp.task('es6', function() {

    return gulp.src(SRC_DIR)
        .pipe($.plumber())
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(DIST_DIR));
});

/* es6-build */
gulp.task('es6-build', function() {

    return gulp.src(SRC_DIR)
        .pipe($.plumber())
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
        .pipe($.uglify())
        .pipe($.concat('build.js'))
        .pipe(gulp.dest(DIST_DIR));
});

//监听文件修改
gulp.task('watch', ['es6'], function() {
    gulp.watch([SRC_DIR], ['es6']);
});
// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () { 
    gulp.watch([SRC_DIR], ['es6']);
});