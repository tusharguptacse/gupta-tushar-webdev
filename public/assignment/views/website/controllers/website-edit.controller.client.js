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
            vm.websiteId = $routeParams['wid'];
            WebsiteService.findWebsiteById(vm.websiteId)
                .success(function (foundWebsite) {
                    vm.website = foundWebsite;
                })
                .error(function (err) {
                    vm.error = "Cannot find website!"
                });

            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function (arrayWebsites) {
                    vm.websites = arrayWebsites;
                })
                .error(function (err) {
                    vm.error = "Cannot find this user's websites!"
                });
        }

        init();

        function update(website) {
            WebsiteService.updateWebsite(vm.websiteId, website)
                .success(function (res) {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function (err) {
                    vm.error = "failed to update";
                });
        }

        function deleteSite() {
            WebsiteService.deleteWebsite(vm.websiteId)
                .success(function (res) {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function (err) {
                    vm.error = "Failed to delete!";
                });
        }
    }
})();
