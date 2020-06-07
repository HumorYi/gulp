var gulp = require('gulp');

const babel=require('gulp-babel');

var jsUglify = require('gulp-uglify');
var cssUglify = require('gulp-minify-css');
var htmlUglify = require('gulp-minify-html');
var imageUglify = require('gulp-imagemin');
// 深度压缩图片（png）
var pngquant = require('imagemin-pngquant');
// 只压缩修改的图片
var cache = require('gulp-cache');

// 代码检查
var eslint = require('gulp-eslint');


// 代码合并和重命名
var concat = require('gulp-concat');
var rename = require('gulp-rename');

// 编译样式文件
var less = require('gulp-less');
var sass = require('gulp-sass');
var precss = require('precss');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// 热更新
var livereload = require('gulp-livereload');

// 删除打包目录文件
const del = require('del');

const sourcemaps = require('gulp-sourcemaps')


const baseUrl = './src/';
const distUrl = './dist/';

var pathConfig = {
  js: {
    src: baseUrl + 'js/**/*.js',
    dest: distUrl + 'js'
  },
  css: {
    src: baseUrl + 'css/**/*.css',
    dest: distUrl + 'css'
  },
  less: {
    src: baseUrl + 'less/**/*.less',
    dest: distUrl + 'css'
  },
  sass: {
    src: baseUrl + 'sass/**/*.sass',
    dest: distUrl + 'css'
  },
  html: {
    src: baseUrl + '**/*.html',
    dest: distUrl
  },
  image: {
    src: baseUrl + 'images/*.{png,jpg,gif,cio,jpeg,svg}',
    dest: distUrl + 'images'
  }
};

var jsConcatName = 'app.js';

var task_cssUglify = function (cb) {
  gulp.src(pathConfig.css.src)
    .pipe(sourcemaps.init())
    .pipe(postcss([precss, autoprefixer]))
    .pipe(sourcemaps.write('.'))
    .pipe(cssUglify())
    .pipe(gulp.dest(pathConfig.css.dest))
    .pipe(livereload());

  cb();
};

var task_jsUglify = function (cb) {
  gulp.src(pathConfig.js.src)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(jsUglify())
    .pipe(gulp.dest(pathConfig.js.dest))
    .pipe(livereload());

  cb();
};

var task_htmlUglify = function (cb) {
  gulp.src(pathConfig.html.src)
    .pipe(htmlUglify())
    .pipe(gulp.dest(pathConfig.html.dest))
    .pipe(livereload());

  cb();
};

var task_imageUglify = function (cb) {
  gulp.src(pathConfig.image.src)
    .pipe(cache(imageUglify({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化

      // png深度压缩图片
      // progressive: true,
      // svgoPlugins: [{ removeViewBox: false }],//不要移除svg的viewbox属性
      // use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
    })))
    .pipe(gulp.dest(pathConfig.image.dest))
    .pipe(livereload());

  cb();
};

var task_eslint = function (cb) {
  gulp.src(pathConfig.js.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

  cb();
};

var task_jsConcat = function (cb) {
  gulp.src(pathConfig.js.src)
    .pipe(concat(jsConcatName))
    .pipe(rename({ suffix: '.min' }))
    .pipe(jsUglify())
    .pipe(gulp.dest(pathConfig.js.dest))
    .pipe(livereload());

  cb();
};

var task_less = function (cb) {
  gulp.src(pathConfig.less.src)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([precss, autoprefixer]))
    .pipe(sourcemaps.write('.'))
    .pipe(cssUglify())
    .pipe(gulp.dest(pathConfig.less.dest));

  cb();
};

var task_sass = function (cb) {
  gulp.src(pathConfig.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([precss, autoprefixer]))
    .pipe(sourcemaps.write('.'))
    .pipe(cssUglify())
    .pipe(gulp.dest(pathConfig.sass.dest));

  cb();
};

var task_hot = function (cb) {
  livereload.listen();

  gulp.watch([
    pathConfig.js.src,
    pathConfig.css.src,
    pathConfig.less.src,
    pathConfig.sass.src,
    pathConfig.image.src,
    pathConfig.html.src,
  ]).on('change', function (path, stats) {
    livereload.changed(path);
  });

  cb();
};

var task_clean = function (cb) {
  del(baseUrl)

  cb();
};

gulp.task('js-uglify', task_jsUglify);

gulp.task('css-uglify', task_cssUglify);

gulp.task('html-uglify', task_htmlUglify);

gulp.task('image-uglify', task_imageUglify);

gulp.task('eslint', task_eslint);

gulp.task('js-concat', task_jsConcat);

gulp.task('less', task_less);

gulp.task('sass', task_sass);

gulp.task('hot', task_hot);

gulp.task('clean', task_clean);


// 压缩建议在测试前进行，只压缩一次，比较耗时
gulp.task('default', gulp.series(
  task_eslint,
  task_hot,
));

gulp.task('build', gulp.series(
  task_clean,
  task_less,
  task_sass,
  task_cssUglify,
  task_jsConcat,
  task_htmlUglify,
  task_imageUglify,
));