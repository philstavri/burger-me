(function(){

    var burgerApp = angular.module("burger-me", [
        "burger-me-templates"
    ]);

    burgerApp.run(function(){
        console.log("burger run block");
    });
})();
