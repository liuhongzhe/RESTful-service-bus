var gulp = require('gulp');
var del = require('del');
var gts = require('gulp-typescript');
var gtsp = gts.createProject('tsconfig.json');

var paths = {
    outputRoot: 'build',
    ts: {
        src: 'src/**/*.ts',
        dest: 'build'
    }
}

gulp.task('clean', function () {
    return del(paths.outputRoot);
});

gulp.task('tsc', ['clean'], function () {
    return gulp.src(paths.ts.src)
        .pipe(gtsp())
        .pipe(gulp.dest(paths.ts.dest));
});

gulp.task('tsc:w', ['tsc'], function () {
    return gulp.watch([paths.ts.src], ['tsc']);
});

gulp.task('build', ['clean', 'tsc', 'tsc:w']);

gulp.task('default', ['build']);