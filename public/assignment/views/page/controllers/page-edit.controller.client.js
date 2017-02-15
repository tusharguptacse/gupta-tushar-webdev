(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService) {
        var vm = this;
        vm.update = update;
        vm.deletePage = deletePage;
        function init() {
            vm.userId = $routeParams['uid'];
            var userId = vm.userId;
            vm.websiteId = $routeParams['wid'];
            var pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.pageId = $routeParams['pid'];

            var pageId = vm.pageId;
            console.log(pageId);

            vm.pages = pages;
            var page = PageService.findPageById(vm.pageId);

            vm.page = page;
            console.log(page);
        }
        init();

        function update(page) {
            var page = PageService.updatePage(vm.pageId, page);
            if(page != null) {
                vm.message = "Page Successfully Updated!"
            } else {
                vm.error = "Unable to update page!";
            }
        }

        function deletePage() {
            var p = PageService.deletePage(vm.pageId);
            if(p != null) {
                vm.message = "Page Successfully Deleted!"
            } else {
                vm.error = "Unable to delete page!";
            }
        }
    }
})();
