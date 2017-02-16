(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams,$location, PageService) {
        var vm = this;
        vm.create = create;
        function init() {
            vm.websiteId = $routeParams['wid'];
            vm.userId = $routeParams['uid'];
        }
        init();
        var pages = PageService.findPageByWebsiteId(vm.websiteId);
        vm.pages = pages;
        websiteId = vm.websiteId;


        function create(page) {
                var newPage = PageService.createPage(vm.websiteId, page);

                if(newPage) {
                    $location.url("/user/"+vm.userId+"/website/"+websiteId+"/page/");

                }
                else {
                    vm.error = "Page cannot be created!";
                }
        }
    }
})();