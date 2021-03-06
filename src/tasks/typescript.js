///@ts-check
"use strict";
var gulp = require("gulp");
var fs = require("fs");

var colors = require('ansi-colors');
const color = require('../log/color');
var compileTs = require("../compiler/compile-typescript");
var unlink = require("../lib/unlink");
var extToGlob = require("../lib/ext-to-glob");
var watchLog = require("../log/watch");
var log = require('../log/logger');

var TS_EXTS = ["ts"];
/**
 * @param {object} config
 */
exports.build = function (config) {
    if (config.tsconfig || fs.existsSync("tsconfig.json")) {
        return function () {
            config.tsconfig = config.tsconfig || "tsconfig.json";
            return compileTs(config);
        }
    } else {
        log.info(
            color('typescript:'),
            colors.gray('`tsconfig.json` was not found. Skip typescript compilation!')
        );
        return function (cb) {
            cb && cb();
        }
    }
};

exports.pushArrayOrItem = function pushArrayOrItem(arr, item) {
    if (arr instanceof Array) {
        return arr.slice(0).push(item)
    } else {
        return arr ? [arr, item] : [item]
    }
}
/**
 * @param {object} config
 */
exports.watch = function (config) {
    return function (cb) {
        var glob = extToGlob(config, TS_EXTS);
        watchLog("typescript", glob);
        gulp.watch(glob, {
            ignored: exports.pushArrayOrItem(config.exclude, config.src + "/*/**.d.ts"),
            delay: 1200
        })

            .on("change", function (file) {
                return compileTs(config, file);
            })
            .on("add", function (file) {
                return compileTs(config, file);
            })
            .on("unlink", unlink(config.src, config.dist, ".js"));
        cb && cb();
    };
};
