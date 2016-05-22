var del = require('del'),
  gulp = require('gulp'),
  plugins = require('gulp-load-plugins')();

gulp.task('install:ts', plugins.shell.task(['typings install']));

gulp.task('install', ['install:ts'], function() {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(plugins.install());
});

gulp.task('prod', ['build'], function () {
  plugins.env({ vars: { NODE_ENV: 'production' } });
  plugins.nodemon({
    script: 'app.js',
    ext: 'js',
    nodeArgs: ['--debug=5858'] 
  });
});

gulp.task('develop', function () {
  plugins.livereload.listen();
  plugins.nodemon({
    script: 'app.js',
    ext: 'js swig css',
    stdout: false,
    nodeArgs: ['--debug=5858']//['--debug-brk=5858'] 
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        plugins.livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('clean', function() {
  return del(['dist/*']);
});

gulp.task('copy:img', ['clean'], function () {
  return gulp.src('./public/img/**', {base:'./public'})
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', ['copy:img'], function () {
  return gulp.src([ './public/components/Materialize/dist/font/**', './public/components/Materialize/dist/fonts/**' ], {base:'./public/components/Materialize/dist'})
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['copy'], function () {
  var jsFilter = plugins.filter('**/*.js', {restore: true});
  var cssFilter = plugins.filter('**/*.css', {restore: true});
  var htmlFilter = plugins.filter(['**/*.swig'], {restore: true});
  var nonHtmlFilter = plugins.filter(['**/*.!(swig)'], {restore: true});
  
  return gulp.src('./app/views/*.swig')
    .pipe(plugins.useref({ searchPath: './public' })) 
    .pipe(jsFilter)
      .pipe(plugins.uglify()) 
      .pipe(jsFilter.restore)
    .pipe(cssFilter)
      .pipe(plugins.cleanCss({ processImportFrom: ['!fonts.googleapis.com'] })) 
      .pipe(plugins.autoprefixer({browsers: ['last 1 version']}))
      .pipe(cssFilter.restore)
    .pipe(htmlFilter)
      .pipe(plugins.htmlmin({collapseWhitespace: true}))
      .pipe(plugins.rename(function(path) { path.dirname += '/views'; }))
      .pipe(htmlFilter.restore)
    .pipe(nonHtmlFilter)
      .pipe(plugins.rev())
      .pipe(nonHtmlFilter.restore)
    .pipe(plugins.revReplace({replaceInExtensions: ['.swig']}))   
    .pipe(gulp.dest('dist'));  
});

gulp.task('default', ['develop']);