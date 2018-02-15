var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var json_refs = require('gulp-json-refs');
var rename = require("gulp-rename");
var replace = require('gulp-replace');

gulp.task('bundle', function() {
  return gulp.src('schema.json')
    .pipe(json_refs())
    // TODO: remove (probably all) replace functions below when OpenAPI 3.0 is merged (also clean gulpfile and env dist)
    .pipe(replace('$SANDBOX_SCHEMA', process.argv[8]))
    .pipe(replace('$SANDBOX_HOST', process.argv[10]))
    .pipe(replace('$OAUTH_HOST', process.argv[12]))
    .pipe(replace('$base_url', process.argv[8] + '://' + process.argv[10]))
    .pipe(rename('swagger.json'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});

gulp.task('src', function() {
  gulp.src(['src/**/*', '!src/index.html'])
    .pipe(gulp.dest('dist/'));
  gulp.src(['src/index.html'])
    .pipe(replace('{{specification-json-url}}', (process.argv[6] !== undefined) ? process.argv[6] + '?d=' + Date.now() : 'http://petstore.swagger.io/v2/swagger.json'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});

gulp.task('swagger-ui', function() {
  gulp.src(['node_modules/swagger-ui-dist/swagger-*.css', 'node_modules/swagger-ui-dist/swagger-*.js'])
    .pipe(gulp.dest('dist/swagger-ui/'));
});

gulp.task('serve', ['bundle', 'src', 'swagger-ui'], function() {
  browserSync.init({
    https: true,
    online: false,
    open: false,
    port: (process.argv[4] !== undefined) ? process.argv[4] : 3200,
    server: {
      baseDir: 'dist'
    },
    ui: false
  });
});

gulp.task('watch', ['serve'], function() {
  gulp.watch(['specification/**/*'], {interval: 500}, ['bundle']);
  gulp.watch(['src/**/*'], {interval: 500}, ['src']);
});
