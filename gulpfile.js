var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var pump = require("pump");
var clean = require("gulp-clean");
var runSequence = require("run-sequence");
var ngHtml2Js = require("gulp-ng-html2js");
var merge = require("merge-stream");
var htmlmin = require('gulp-htmlmin');
var batch = require('gulp-batch');
var watch = require('gulp-watch');

var vendorFiles = [
    "./node_modules/angular/angular.js",
    "./node_modules/angular-route/angular-route.js",
    "./node_modules/angular-sanitize/angular-sanitize.js"
];

var config = {
    buildDir: "./build/burger-me/",
    html: {
        minify: {
            collapseWhitespace: true
        }
    },
    templates: {
        moduleName: "burger-me-templates"
    }
}


gulp.task("clean", function(){
    return gulp.src(config.buildDir + "**/*")
        .pipe(clean());
});

gulp.task("html", function(){
    return gulp.src("./src/index.html")
        .pipe(htmlmin(config.html.minify))
        .pipe(gulp.dest(config.buildDir));
});

gulp.task("watch", function(){

    watch("./src/**/*.html",
        {},
        batch(function(events, done){
            gulp.start("build", done);
        })
    );
});

gulp.task("build", function(cb){
    return runSequence("clean", ["html","scripts:app", "scripts:vendor"], cb);
});

gulp.task("scripts:app", function () {

    var templates = gulp.src(["!./src/index.html", "./src/**/*.html"])
        .pipe(htmlmin(config.html.minify))
        .pipe(ngHtml2Js(config.templates));

    var app = gulp.src("./src/**/*.js");

    return merge(templates, app)
        .pipe(concat("app.js"))
        .pipe(uglify())
        .pipe(gulp.dest(config.buildDir));
});

gulp.task("scripts:vendor", function (cb) {

    return gulp.src(vendorFiles)
        .pipe(concat("vendor.js"))
        .pipe(uglify())
        .pipe(gulp.dest(config.buildDir));
});

gulp.task('default', ["build"]);