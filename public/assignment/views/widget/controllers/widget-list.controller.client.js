(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($sce, $routeParams, $location, WidgetService) {
        var vm = this;
        vm.getSafeHtml = getSafeHtml;
        vm.checkSafeURL = checkSafeURL;


        function init() {
            vm.userId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];
            vm.pageId = $routeParams['pid'];
            vm.currentWidgetId = $routeParams['wgid'];
            vm.loc = $location;

            WidgetService.findWidgetsByPageId(vm.pageId)
                .success(function (widgetsFound) {
                    vm.widgets = widgetsFound;
                    console.log(widgetsFound);
                })
                .error(function (err) {
                    vm.error = "Error while fetching widgets!! Please try after sometime";
                });

        }


        init();

        function getSafeHtml(text) {
            return $sce.trustAsHtml(text);
        }

        function checkSafeURL(widgetURL) {
            var parts = widgetURL.split('/');
            var id = parts[parts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;

            return $sce.trustAsResourceUrl(url);
        }

    }

    // Widget Chooser
    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.createNewWidget = createNewWidget;


        function init() {
            vm.userId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];
            vm.pageId = $routeParams['pid'];

            vm.newWidgetHeader = {
                _id: "",
                widgetType: "HEADER",
                pageId: vm.pageId,
                size: 2,
                text: "New Header Text",
                name: "",
                index: -1
            };
            vm.newWidgetImage = {
                _id: "",
                widgetType: "IMAGE",
                pageId: vm.pageId,
                width: "100%",
                url: "http://lorempixel.com/400/200/",
                name: "",
                index: -1
            };
            vm.newWidgetYouTube = {
                _id: "",
                widgetType: "YOUTUBE",
                pageId: vm.pageId,
                width: "100%",
                url: "https://youtu.be/AM2Ivdi9c4E",
                name: "",
                index: -1
            };
            vm.newWidgetHTML = {
                _id: "",
                widgetType: "HTML",
                pageId: vm.pageId,
                text: "<p>Lorem ipsum</p>",
                name: "",
                index: -1
            };
        }

        init();

        function createNewWidget(newWidget) {

            WidgetService.createWidget(vm.pageId, newWidget)
                .success(function (widgetCreated) {
                    if (widgetCreated != null) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetCreated._id);
                    }
                    else {
                        vm.error = "Failed to create new widget";
                    }
                });
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.userId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];
            vm.pageId = $routeParams['pid'];
            vm.currentWidgetId = $routeParams['wgid'];

            WidgetService.getOptions()
                .success(function (response) {
                    if (response != null) {
                        vm.options = response;
                    }
                    else {
                        vm.error = "Failed to get options";
                    }
                });
            //vm.getOptions = WidgetService.getOptions();
            WidgetService.findWidgetById(vm.currentWidgetId)
                .success(function (response) {
                    if (response != null) {
                        vm.currentWidget = response;
                    }
                    else {
                        vm.error = "Failed to get current Widget";
                    }
                });
        }

        init();

        function updateWidget() {
            console.log(vm.currentWidget);
            WidgetService.updateWidget(vm.currentWidgetId, vm.currentWidget)
                .success(function (response) {
                    console.log(response);
                    if (response != null) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }
                    else {
                        vm.error = "Failed to update widget";
                    }
                });

        }

        function deleteWidget() {
            console.log(vm.currentWidgetId);

            WidgetService.deleteWidget($routeParams['wgid'])
                .success(function (res) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function (err) {
                    vm.error = "Failed to delete widget";
                });
        }

    }
})();