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

            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function (pagesServer) {
                    vm.pages = pagesServer;
                });
        }
        init();


        function create(page) {
                PageService.createPage(vm.websiteId, page)
                    .success(function (newPageCreated) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
                    })
                    .error(function (err) {
                        vm.error = "Failed!";
                    });
        }
    }
})();