var gulp = require('gulp');
var del = require('del');
var rs = require('run-sequence');
var gts = require('gulp-typescript');
var gtsp = gts.createProject('tsconfig.json');

var paths = {
    outputRoot: 'build',
    ts: {
        src: 'src/**/*.ts',
        dest: this.outputRoot
    }
}

gulp.task('clean', function () {
    return del(paths.outputRoot);
});

gulp.task('tsc', function () {
    return gulp.src(paths.ts.src)
        .pipe(gtsp())
        .pipe(gulp.dest(paths.outputRoot));
});

gulp.task('tsc:w', ['tsc'], function () {
    return gulp.watch([paths.ts.src], ['tsc']);
});

gulp.task('copy:packages', ['clean'], function () {
    return gulp.src([
        'node_modules/@angular/*/bundles/*.umd.min.js',
        'node_modules/angular-in-memory-web-api/bundles/*',
        'node_modules/bootstrap/dist/**/*',
        'node_modules/core-js/client/shim.min.js',
        'node_modules/core-js/client/shim.min.js.map',
        'node_modules/jquery/dist/**/*',
        'node_modules/ng2-bootstrap/bundles/**/*',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/reflect-metadata/Reflect.js.map',
        'node_modules/rxjs/**/*',
        'node_modules/systemjs/dist/**/*',
        'node_modules/zone.js/dist/**/*',
        'node_modules/moment/min/**/*',
        'node_modules/ng2-bootstrap/bundles/**/*',
        'node_modules/node-uuid/uuid.js'], {
            base: 'node_modules'
        }).pipe(gulp.dest('build/lib'));
});

gulp.task('copy:systemjs.config', function () {
    return gulp.src('src/systemjs.config.js').pipe(gulp.dest('build'));
});

gulp.task('copy:template', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('build'));
});

gulp.task('copy:assets', function () {
    return gulp.src('src/assets/**/*.*', {
        base: 'src'
    }).pipe(gulp.dest('build'));
});

gulp.task('build', function () {
    rs(['tsc', 'copy:template', 'copy:assets']);
});

gulp.task('rebuild', ['clean'], function () {
    rs(['tsc', 'copy:packages', 'copy:systemjs.config', 'copy:template', 'copy:assets']);
})

gulp.task('debug', ['rebuild', 'tsc:w']);

gulp.task('default', ['rebuild']);