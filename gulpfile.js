/**
 * @file gulpfile.js
 */

'use strict';

const gulp = require('gulp');
const del = require('delete');
const merge = require('merge2');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', () =>
    del([
        'dist'
    ])
);

gulp.task('build', () => {

    const tsResult = gulp.src('./src/**/*.ts')
                         .pipe(tsProject({
                             declaration: true
                         }));
    // .pipe(gulp.dest('dist'))

    return merge([
        tsResult.dts.pipe(gulp.dest(__dirname)),
        tsResult.js.pipe(gulp.dest('dist'))
    ]);

});

gulp.task('default', gulp.series('clean', 'build'));
