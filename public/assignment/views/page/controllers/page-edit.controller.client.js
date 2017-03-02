(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.update = update;
        vm.deletePage = deletePage;
        function init() {
            vm.userId = $routeParams['uid'];
            var userId = vm.userId;
            vm.websiteId = $routeParams['wid'];
            vm.pageId = $routeParams['pid'];
            var pageId = vm.pageId;

            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function (pagesServer) {
                    vm.pages = pagesServer;
                });

            PageService.findPageById(vm.pageId)
                .success(function(currentPage) {
                    vm.page = currentPage;
                })
                .error(function(err) {
                    vm.error = "Can't find page!";
                });
        }
        init();

        function update(updatedPage) {
            PageService.updatePage(vm.pageId, updatedPage)
                .success(function (page) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
                })
                .error(function (err) {
                    vm.error = "Unable to update!";
                });
            //
            // if(page != null) {
            //     vm.message = "Page Successfully Updated!"
            //     $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
            // } else {
            //     vm.error = "Unable to update page!";
            // }
        }

        function deletePage() {
            PageService.deletePage(vm.pageId)
                .success(function (res) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
                })
                .error(function (err) {
                    vm.error = "Can't delete page!";
                });
            // if(p != null) {
            //     vm.message = "Page Successfully Deleted!"
            //     $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
            // } else {
            //     vm.error = "Unable to delete page!";
            // }
        }
    }
})();
