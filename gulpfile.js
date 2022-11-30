/**
 * @file gulpfile.js
 */

'use strict';

const gulp = require('gulp');
const del = require('delete');
const babel = require('gulp-babel');

gulp.task('clean', () =>
    del([
        'dist'
    ])
);

gulp.task('build', () =>
    gulp.src('./src/**/*.js')
        .pipe(babel({
            presets: [['@babel/env', {modules: 'commonjs'}]]
        }))
        .pipe(gulp.dest('./dist'))
);

gulp.task('default', gulp.series('clean', 'build'));
