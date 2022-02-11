/**
 * @file gulpfile.js
 */

'use strict';

const gulp = require('gulp');
const clean = require('gulp-clean');
const babel = require('gulp-babel');

gulp.task('clean', () =>
    gulp.src('./dist')
        .pipe(clean())
);

gulp.task('build', () =>
    gulp.src('./src/**/*.js')
        .pipe(babel({
            presets: [['@babel/env', {modules: 'commonjs'}]],
            plugins: ['@babel/plugin-transform-runtime']
        }))
        .pipe(gulp.dest('./dist'))
);

gulp.task('default', gulp.series('clean', 'build'));
