const gulp = require('gulp');
const childProcess = require('child_process');
const gulpLoadPlugins = require('gulp-load-plugins');

let plugins = gulpLoadPlugins();

gulp.task('server start', function (done) {
  plugins.nodemon({
    script: './server.js',
    ext: 'js'
  });
});

gulp.task('run tests', function() {
  childProcess.spawn('jasmine', [`${__dirname}/spec/**/*[sS]pec.js`], {
    stdio: 'inherit'
  });
});
