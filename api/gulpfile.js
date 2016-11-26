var gulp = require('gulp');
var del = require('del');
var gts = require('gulp-typescript');

var paths = {
    outputRoot: 'build',
    ts: {
        src: [
            'src/**/*.ts'
        ],
        dest: this.outputRoot
    }
}

gulp.task('clean', function() {
    return del(paths.outputRoot);
});

gulp.task('tsc', ['clean'], function() {
    return gulp.src(paths.ts.src)
        .pipe(gts({
            module: 'commonjs',
            target: 'es5'
        }))
        .pipe(gulp.dest(paths.outputRoot));
});

gulp.task('tscw', ['tsc'], function() {
    return gulp.watch([paths.ts.src], ['tsc']);
});

gulp.task('build', ['clean', 'tsc']);

gulp.task('default', ['build', 'tscw']);
