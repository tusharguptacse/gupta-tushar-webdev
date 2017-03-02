/**
 * Created by tushargupta on 3/1/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir() {
        function linkfunc(scope, element, attributes, sortingController) {
            element.sortable({
                start: function (event, ui) {
                    // Set the start index and make it available for ui item
                    ui.item.startPos = ui.item.index();
                },
                update: function (event, ui) {
                    // var widget = ui.item.scope().widget;
                    var startIndex = ui.item.startPos;
                    var endIndex = ui.item.index();
                    sortingController.widgetsSort(startIndex, endIndex);
                },
                axis: 'y',
                cursor: "move"

            });
        }

        return {
            link: linkfunc,
            controller: sortableWidgetsController
        }

    }

    function sortableWidgetsController(WidgetService, $routeParams) {
        var vm = this;
        vm.widgetsSort = widgetsSort;

        function widgetsSort(start, end) {
            var pageId = $routeParams.pid;
            WidgetService
                .updateWidgetOrder(pageId, start, end)
                .success(function (response) {
                })
                .error(function () {
                });
        }
    }

})();