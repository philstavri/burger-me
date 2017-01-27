var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var pump = require("pump");
var clean = require("gulp-clean");
var runSequence = require("run-sequence");

var vendorFiles = [
    "./node_modules/angular/angular.js",
    "./node_modules/angular-route/angular-route.js",
    "./node_modules/angular-sanitize/angular-sanitize.js"
];

var buildDir = "./build/";


gulp.task("clean", function(){
    return gulp.src(buildDir + "**/*")
        .pipe(clean());
});

gulp.task("html", function(){
    return gulp.src("./src/index.html")
        .pipe(gulp.dest(buildDir));
});

gulp.task("build", ["clean"], function(cb){
    runSequence("html", "scripts:app", "scripts:vendor", cb);
});

gulp.task("scripts:app", function (cb) {
    pump([
            gulp.src("./src/**/*.js"),
            concat("app.js"),
            uglify(),
            gulp.dest(buildDir)
        ],
        cb
    );
});

gulp.task("scripts:vendor", function (cb) {

    pump([
            gulp.src(vendorFiles, { base: "./node_modules/" }),
            concat("vendor.js"),
            uglify(),
            gulp.dest(buildDir)
        ],
        cb
    );
});

gulp.task('default', ["build"]);