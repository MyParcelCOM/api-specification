const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const json_refs = require('gulp-json-refs')
const JsonRefs = require('json-refs')
const rename = require('gulp-rename')
const replace = require('gulp-replace')

gulp.task('bundle', function () {
  JsonRefs.clearCache()
  return gulp.src('root.json')
    .pipe(json_refs())
    .pipe(replace('$API_HOST', process.argv[6]))
    .pipe(replace('$AUTH_HOST', process.argv[8]))
    .pipe(rename('swagger.json'))
    .pipe(gulp.dest('dist/'))
})

gulp.task('src', function () {
  return gulp.src(['src/**/*', '!src/index.html'])
    .pipe(gulp.dest('dist/'))
})

gulp.task('html', function () {
  return gulp.src('src/index.html')
    .pipe(replace('{{specification-json-url}}', 'swagger.json?d=' + Date.now()))
    .pipe(gulp.dest('dist/'))
})

gulp.task('swagger-ui', function () {
  return gulp.src(['node_modules/swagger-ui-dist/swagger-*.css', 'node_modules/swagger-ui-dist/swagger-*.js'])
    .pipe(gulp.dest('dist/swagger-ui/'))
})

gulp.task('serve', function () {
  browserSync.init({
    notify: false,
    https: true,
    online: false,
    open: false,
    port: (process.argv[4] !== undefined) ? process.argv[4] : 3200,
    server: {
      baseDir: 'dist'
    },
    ui: false
  })
})

function browserSyncReload (done) {
  browserSync.reload()
  done()
}

function watchFiles () {
  gulp.watch(['specification/**/*'], {interval: 500}, gulp.series('bundle', browserSyncReload))
  gulp.watch(['src/**/*'], {interval: 500}, gulp.series(gulp.parallel('src', 'html'), browserSyncReload))
}

gulp.task('watch', gulp.series(
  gulp.parallel('bundle', 'src', 'html', 'swagger-ui'),
  gulp.parallel(watchFiles, 'serve')
))
