/*********************
说明：前端集成开发环境 1.0版本:

资源文件
- assets
  + images
  + css
  + less
  + script

源文件
- html
  + index
  + public

生成文件
- view
  + index
  + public

by 馒头
***************************/

var gulp = require('gulp');
var less = require("gulp-less"); //less 编译
var autoprefixer = require('gulp-autoprefixer'); //自动加浏览器前缀
var includeTag = require('gulp-include-tag'); //include 方法

//error 后，的操作，用于less报错后继续执行
var notify = require('gulp-notify'),
    plumber = require('gulp-plumber');

// var pathJsAll = 'assets/script/**/*.js';
var pathLessAll = ['assets/less/*.less','assets/less/**/*.less'];
var pathCssAll = 'assets/css/*.css';
var pathCss = 'assets/css/';
var pathHtml = ['html/*.html','html/**/*.html'];
var pathViewHtmlAll = 'view/';

//任务 - less 转 css
gulp.task('less', function(){
  return gulp.src(pathLessAll)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe( less() )
    .pipe( gulp.dest(pathCss) );
});

//任务 - autoprefix  自动加上 css3 前缀
/**
*  ● last 2 versions: 主流浏览器的最新两个版本
*  ● last 1 Chrome versions: 谷歌浏览器的最新版本
*  ● last 2 Explorer versions: IE的最新两个版本
*  ● last 3 Safari versions: 苹果浏览器最新三个版本
*  ● Firefox >= 20: 火狐浏览器的版本大于或等于20
*  ● iOS 7: IOS7版本
*  ● Firefox ESR: 最新ESR版本的火狐
*  ● > 5%: 全球统计有超过5%的使用率
*/
gulp.task('autoprefix', function(){
  return gulp.src(pathCssAll)
    .pipe( autoprefixer({browsers: ['last 2 versions','Firefox >= 20'],cascade: false}) )
    .pipe( gulp.dest(pathCss) );
});

//任务 - include 方法 
/**
*  eg: <include src="public/header.html" data="test"></include>
*  在header.html可以通过 {{data}} 获取到test
*/
gulp.task('include', function () {
  return gulp.src(pathHtml)
    .pipe(includeTag())
    .pipe(gulp.dest(pathViewHtmlAll));
});

//动态监听 watch
gulp.task('watch', function(event) {
  gulp.watch(pathLessAll, ['less']);
  //gulp.watch(pathCssAll, ['autoprefix']);
  gulp.watch(pathHtml, ['include']);
});

//默认任务
gulp.task('default', ['watch'], function(){
	console.log('任务开始...');
});