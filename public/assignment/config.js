(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        .when("/login", {
            templateUrl: "user/login.html"
        })
    }
})();