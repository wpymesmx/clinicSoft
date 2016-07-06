var gulp = require('gulp');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');
var copy = require('gulp-copy');
var concatenate = require('gulp-concat');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var cleancss = require('gulp-clean-css');
var del = require('del');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('server', function() {
  return gulp.src('build')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 8000,
      fallback: 'index.html',
      livereload: true
    }));
});

gulp.task('clean', function () {
  return del(['build/**/*']);
});

gulp.task('compress', ['build'], function() {
  return gulp.src('build/tmp/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/min'));
});

gulp.task('copy-html', function () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build'));
});

gulp.task('copy-fonts', function () {
  return gulp.src(['src/fonts/**/*'])
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('concat-dev', ['build'], function() {
  return gulp.src(['libs/jquery-1.12.4.js', 'libs/bootstrap.js', 'build/tmp/app.js'])
    .pipe(concatenate('app.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('concat-prod', ['compress'], function() {
  return gulp.src(['libs/jquery-1.12.4.min.js', 'libs/bootstrap.min.js', 'build/min/app.js'])
    .pipe(concatenate('app.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('less', function() {
  return gulp.src('src/less/app.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(cleancss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'));
});

gulp.task('build', function() {
  browserify({
    entries: 'src/jsx/index.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify, {presets: ["es2015", "react"]})
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('build/tmp'));
});

gulp.task('watch', function() {
  gulp.watch(['src/jsx/**/*.jsx', 'src/less/*.less', 'src/jsx/**/*.js'], ['dev']);
});

/*###################
  configurar para tu distribucion
*/
gulp.task('clean-dist', function () {
  return del(['../clinicSoft-desktop/js/**/*', '../clinicSoft-desktop/css/**/*',
              '../clinicSoft-desktop/fonts/**/*', '../clinicSoft-desktop/index.html'],
              {force: true}); //la opcion force es para poder borrar fuera del directorio principal
});

gulp.task('copy-dist-html', ['clean-dist'], function () {
  return gulp.src('build/index.html')
    .pipe(gulp.dest('../clinicSoft-desktop'));
});

gulp.task('copy-dist-fonts', ['copy-dist-html'], function () {
  return gulp.src(['build/fonts/**/*'])
    .pipe(gulp.dest('../clinicSoft-desktop/fonts'));
});

gulp.task('copy-dist-css', ['copy-dist-fonts'], function () {
  return gulp.src(['build/css/**/*'])
    .pipe(gulp.dest('../clinicSoft-desktop/css'));
});

gulp.task('copy-dist-js', ['copy-dist-css'], function () {
  return gulp.src(['build/js/**/*'])
    .pipe(gulp.dest('../clinicSoft-desktop/js'));
});
//tarea para copiar los archivos generados a tu distribucion favorita java war, python (tornado, django, flask)
gulp.task('dist', ['copy-dist-js']);
/*###################*/

//tareas principales
//servidor modo desarrollo
gulp.task('default', ['server-dev', 'watch-dev']);
//servidor modo produccion
//gulp.task('default', ['server-prod', 'watch-prod']);
gulp.task('dev', ['concat-dev', 'less', 'copy-html']);
gulp.task('prod', ['concat-prod', 'less', 'copy-html', 'copy-fonts']);
