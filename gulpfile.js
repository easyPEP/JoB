// Stuff to fix after running bower install:

var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    clean        = require('gulp-clean'),
    concat       = require('gulp-concat'),
    notify       = require('gulp-notify'),
    cache        = require('gulp-cache'),
    livereload   = require('gulp-livereload'),
    coffee       = require('gulp-coffee'),
    lr           = require('tiny-lr'),
    mocha        = require('gulp-mocha'),
    http         = require('http'),
    ecstatic     = require('ecstatic'),
    server       = lr(),
    paths        = {};


paths.javascripts = [
  './bower_components/jquery/jquery.js',
  './bower_components/underscore/underscore.js',
  './bower_components/backbone/backbone.js'
]

gulp.task('javascripts', function() {
  return gulp.src(paths.javascripts)
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(notify({ message: 'javascripts task complete' }));
});

paths.coffeescripts = [
  './src/lib/job.coffee',
  './src/lib/lib.coffee',
  './src/lib/parameter.coffee',
  './src/lib/tag.coffee',
  './src/lib/translation.coffee',
  './src/lib/routing.coffee',
  './src/lib/url_helper.coffee',
  './src/lib/form.coffee'
]

gulp.task('coffeescripts', function() {
  return gulp.src(paths.coffeescripts)
    .pipe(concat('job.coffee'))
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./dist/'))
    .pipe(notify({ message: 'coffeescripts task complete' }));
});

//////////////////////////////////////////
// SERVER SETUP
gulp.task('server', function(){
  // App server
  http.createServer(
    ecstatic({ root: __dirname + '/' })
  ).listen(8081);
  console.log('Server listening on http://localhost:8081');
});

//////////////////////////////////////////
// TEST SETUP
paths.specFiles = ["./src/test/specs/**/*.coffee"]
paths.specMain = ["./src/test/main.coffee"]
gulp.task('specs', function () {
  gulp.src(paths.specMain)
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./dist/test'))
    .pipe(notify({ message: 'Scripts task complete' }));

  return gulp.src(paths.specFiles)
          .pipe(coffee({bare: true}).on('error', gutil.log))
            .pipe(gulp.dest('./dist/test/specs/'))
})

// Rerun the task when a file changes
gulp.task('watch', function () {
  gulp.watch(paths.scripts,       ['scripts']       );
  gulp.watch(paths.coffeescripts, ['coffeescripts'] );
  gulp.watch(paths.specFiles,     ['specs']         );
});

gulp.task('default', [
                      'javascripts',
                      'coffeescripts',
                      'specs',
                      'server',
                      'watch'
                     ]);
