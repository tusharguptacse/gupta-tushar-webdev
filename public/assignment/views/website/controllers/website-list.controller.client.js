(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams['uid'];
        }
        init();

        var userId = vm.userId;
        var websites = WebsiteService.findWebsitesByUser(userId);
        vm.websites = websites;
        console.log(vm.websites);

    }
})();
