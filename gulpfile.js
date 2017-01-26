var gulp = require("gulp");
var concat = require("gulp-concat");

var vendorFiles = [
    "./node_modules/angular/angular.js",
    "./node_modules/angular-route/angular-route.js",
    "./node_modules/angular-sanitize/angular-sanitize.js"
];

gulp.task('build', function () {
    console.log('Building...');

    return gulp.src(vendorFiles, { base: "./node_modules/" })
        .pipe(concat("vendor2.js"))
        .pipe(gulp.dest("./build/"));
});

gulp.task('default', function () {
    console.log('Hello, world!');
});