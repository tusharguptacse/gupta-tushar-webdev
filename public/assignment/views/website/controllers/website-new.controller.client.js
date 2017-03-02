(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.create = create;
        function init() {
            vm.userId = $routeParams['uid'];
            var promise = WebsiteService.findWebsitesByUser(vm.userId)

            promise
                .success(function (arrayWebsites) {
                    vm.websites = arrayWebsites;
                })
                .error(function (err) {
                    vm.error = "Can't create new website";
                });
        }

        init();


        function create(website) {
            var newWebsitePromise = WebsiteService.createWebsite(vm.userId, website);

            newWebsitePromise
                .success(function (website) {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function (err) {
                    vm.error = "failed to create new website";
                });
        }
    }
})();