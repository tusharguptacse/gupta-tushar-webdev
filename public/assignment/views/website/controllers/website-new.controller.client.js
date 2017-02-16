(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.create = create;
        function init() {
            vm.userId = $routeParams['uid'];
        }

        init();
        var websites = WebsiteService.findWebsitesByUser(vm.userId);
        vm.websites = websites;
        userId = vm.userId;


        function create(website) {
            var newWebsite = WebsiteService.createWebsite(vm.userId, website);

            if (newWebsite) {
                $location.url("/user/" + userId + "/website/");

            }
            else {
                vm.error = "Website cannot be created!";
            }
        }
    }
})();