var gulp = require('gulp'),
  shell = require('gulp-shell'),
  install = require('gulp-install'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload');


gulp.task('install', ['install-type'], function() {
  return gulp.src(['./bower.json', './package.json']).pipe(install());
});

gulp.task('install-type', shell.task(['typings install']));

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee swig css',
    stdout: false,
    nodeArgs: ['--debug=5858']//['--debug-brk=5858'] 
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'develop'
]);
