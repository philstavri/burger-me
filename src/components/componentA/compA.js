(function(){
    angular.module("burger-me").component("compAbc", {
        templateUrl: "components/componentA/compA.html",
        controller: function(){
            console.log("component Abc initialised");
        }
    });
})();