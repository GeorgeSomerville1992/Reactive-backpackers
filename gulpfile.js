var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var liveServer = require('gulp-live-server');
var watchify = require('watchify');
var reactify = require('reactify');
var notifier = require('node-notifier');
var server = require('gulp-server-livereload');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');


var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
};

var bundler = watchify(browserify({
  entries: ['./src/app.jsx'],
  transform: [reactify],
  extensions: ['.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

function bundle() {
  return bundler
    .bundle()
    .on('error', console.log)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./'))
}
bundler.on('update', bundle)

gulp.task('build', function() {
  bundle()
});

gulp.task('live-server', function() {
  var server = new liveServer('server/app.js');
  server.start();
});

gulp.task('image-min', function () {
  return gulp.src('./src/assets/*').pipe(imagemin({
    progressive: true,
    svgoPlugins: [{ removeViewBox: false }]
  })).pipe(gulp.dest('.tmp/images'));
});

gulp.task('bundle-project', function(done) {

    return browserify({
        entries:'./src/app.jsx',
        debug:true,
    })
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./.tmp'));
  // gulp.src('')
  //   .pipe(server({
  //     livereload: {
  //       enable: true,
  //       fallback: 'index.html',
  //       filter: function(filePath, cb) {
  //         if(/main.js/.test(filePath)) {
  //           cb(true)
  //         } else if(/style.css/.test(filePath)){
  //           cb(true)
  //         }
  //       }
  //     },
  //     open: true
  //   }));
})

gulp.task('serve', ['bundle-project', 'live-server'], function(){
  browserSync.init(null,{
      proxy:"http://localhost:7777",
      port: 9001
  })
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./.tmp'));
});

gulp.task('default', ['build', 'serve', 'sass', 'image-min', 'watch']);

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});