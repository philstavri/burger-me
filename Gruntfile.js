function gruntSetup(grunt){

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            app:{
                src: [
                    "./node_modules/angular/angular.js",
                    "./node_modules/angular-route/angular-route.js",
                    "./node_modules/angular-sanitize/angular-sanitize.js"
                ],
                dest: "build/vendor.js"
            }
        }
    });

    grunt.registerTask("default", ["concat"]);
}

module.exports = gruntSetup;