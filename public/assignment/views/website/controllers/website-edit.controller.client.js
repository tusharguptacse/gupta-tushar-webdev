(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
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
            if (website != null) {
                // vm.message = "Website Successfully Updated!"
                $location.url("/user/" + vm.userId + "/website/");
            } else {
                vm.error = "Unable to update website!";
            }
        }

        function deleteSite() {
            var webs = WebsiteService.deleteWebsite(vm.websiteId);
            if (webs != null) {
                // vm.message = "Website Successfully Deleted!"
                $location.url("/user/" + vm.userId + "/website/");
            } else {
                vm.error = "Unable to delete website!";
            }
        }
    }
})();
