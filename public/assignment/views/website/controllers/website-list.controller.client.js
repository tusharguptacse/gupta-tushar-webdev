(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams['uid'];
            var promise = WebsiteService.findWebsitesByUser(vm.userId);

            promise
                .success(function (arrayWebsites) {
                    vm.websites = arrayWebsites;

                })
                .error(function (err) {
                    vm.error = "Can't find websites :P"
                })
        }
        init();

        // var userId = vm.userId;
        // var websites = WebsiteService.findWebsitesByUser(userId);
        // vm.websites = websites;


    }
})();
