(function main() {

    var fs         = require('fs'),
        gulp       = require('gulp'),
        karma      = require('gulp-karma'),
        browserify = require('browserify'),
        babelify   = require('babelify');

    var compile = function(destPath, entryFile) {

        return browserify({ debug: true })
            .transform(babelify)
            .require(entryFile, { entry: true })
            .bundle()
            .on('error', function (model) { console.error(['Error:', model.message].join(' ')); })
            .pipe(fs.createWriteStream(destPath));

    };

    gulp.task('compile', function() {
        return compile('example/js/bundle.js', 'example/js/app.js');
    });

    gulp.task('karma', function() {

        return gulp.src([].concat('src/keo.js', 'tests/*.test.js'))
            .pipe(karma({
                configFile: 'karma.conf.js',
                action: 'run'
            }))
            .on('error', function(err) { throw err; });

    });

    gulp.task('test', ['karma']);
    gulp.task('build', ['compile']);
    gulp.task('default', ['test', 'build']);

    gulp.task('watch', function watch() {
        return gulp.watch(['example/js/app.js', 'src/keo.js', 'tests/components/gremlin.js'], ['build']);
    });

})();
