(function main() {

    var gulp   = require('gulp'),
        karma  = require('gulp-karma');

    gulp.task('karma', function() {

        return gulp.src([].concat('src/funkel.js', 'tests/*.test.js'))
            .pipe(karma({
                configFile: 'karma.conf.js',
                action: 'run'
            }))
            .on('error', function(err) { throw err; });

    });

    gulp.task('test', ['karma']);
    gulp.task('default', ['test']);

})();
