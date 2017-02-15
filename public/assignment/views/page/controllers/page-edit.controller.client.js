(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService) {
        var vm = this;
        vm.update = update;
        vm.deleteSite = deleteSite;
        function init() {
            vm.userId = $routeParams['uid'];
            var userId = vm.userId;
            vm.websiteId = $routeParams['wid'];
            var website = WebsiteService.findWebsiteById(vm.websiteId);
            vm.website = website;
            var websites = WebsiteService.findWebsitesByUser(userId);
            vm.websites = websites;
        }
        init();

        function update(website) {
            var website = WebsiteService.updateWebsite(vm.websiteId, website);
            if(website != null) {
                vm.message = "Website Successfully Updated!"
            } else {
                vm.error = "Unable to update website!";
            }
        }

        function deleteSite() {
            var webs = WebsiteService.deleteWebsite(vm.websiteId);
            if(webs != null) {
                vm.message = "Website Successfully Deleted!"
            } else {
                vm.error = "Unable to delete website!";
            }
        }
    }
})();
