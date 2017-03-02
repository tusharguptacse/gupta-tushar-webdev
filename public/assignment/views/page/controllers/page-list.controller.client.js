(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        function init() {
            vm.websiteId = $routeParams['wid'];
            vm.userId = $routeParams['uid'];
            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function (page) {
                    vm.pages = page;
                });
        }
        init();

    }
})();
