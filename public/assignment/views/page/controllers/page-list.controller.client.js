(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        function init() {
            vm.websiteId = $routeParams['wid'];
            vm.userId = $routeParams['uid'];
        }
        init();

        var websiteId = vm.websiteId;
        var pages = PageService.findPageByWebsiteId(websiteId);
        vm.pages = pages;
        console.log(vm.pages);

    }
})();
