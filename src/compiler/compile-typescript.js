
///@ts-check
'use strict';
var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var debug = require("gulp-debug");
var size = require('gulp-size');
var empty = require('../lib/empty');
var replace = require('../lib/multi-replace');

var TITLE = 'typescript:';
/**
 * 编译TS
 * @param {object} config * 
 * @param {string|string[]} [tsFile] 
 */
function compileTS(config, tsFile) {
    var tsProject = ts.createProject(config.tsconfig);
    var src = tsFile ? gulp.src(tsFile, { base: config.src, sourcemaps: !config.release }) : tsProject.src();
//    console.log(tsFile,src)
    return src
        .pipe(debug({ title: TITLE }))
        // .on('error',console.error)
        .pipe(config.release ? empty() : sourcemaps.init())
        .pipe(replace(config.var, undefined, "{{", "}}"))
        .pipe(tsProject(ts.reporter.fullReporter(true)))
        .js
        .pipe(config.release ? empty() : sourcemaps.write())
        .pipe(size({ title: TITLE, showFiles: true }))
        .pipe(gulp.dest(config.dist))
        ;
}
module.exports = compileTS