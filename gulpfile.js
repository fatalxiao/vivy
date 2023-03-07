/**
 * @file gulpfile.js
 */

'use strict';

const gulp = require('gulp');
const del = require('delete');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');

gulp.task('clean', () =>
    del([
        'dist'
    ])
);

gulp.task('build', () =>
    gulp.src('./src/**/*.js')
        .pipe(tsProject())
        .pipe(gulp.dest('./dist'))
);

gulp.task('default', gulp.series('clean', 'build'));
