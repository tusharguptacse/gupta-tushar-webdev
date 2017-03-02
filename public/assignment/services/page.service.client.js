(function () {
    angular
        .module("WebAppMaker")
        .service("PageService", pageService);

    function pageService($http) {
        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];


        var api = {
            "createPage"            : createPage,
            "findPageById"          : findPageById,
            "findPageByWebsiteId"   : findPageByWebsiteId,
            "updatePage"            : updatePage,
            "deletePage"            : deletePage
        };
        return api;


        function createPage(webId, page) {
            var url = "/api/website/" + webId + "/page";

            var newPage = {
                _id         : + new Date(),
                name        : page.name,
                websiteId   : webId,
                description : page.des
            };

            return $http.post(url, newPage);
        }


        function findPageById(pageId) {
            return $http.get("/api/page/" + pageId);
            // for(var p in pages) {
            //     if(pageId === pages[p]._id) {
            //         return pages[p];
            //     }
            // }
            // return null;
        }

        function findPageByWebsiteId(websiteId) {
            return $http.get("/api/website/" + websiteId + "/page");
            // var pagelist = [];
            // for(var p in pages) {
            //     if(websiteId === pages[p].websiteId) {
            //         pagelist.push(pages[p]);
            //     }
            // }
            // return pagelist;
        }

        function updatePage(pageId, page) {
            return $http.put("/api/page/" + pageId, page);
            // for(var p in pages) {
            //     if( pages[p]._id == pageId ) {
            //         pages[p].name = page.name;
            //         pages[p].description = page.description;
            //         return pages[p];
            //     }
            // }
            // return null;
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/" + pageId);
            // for(var p in pages) {
            //     if( pages[p]._id == pageId ) {
            //         return pages.splice(p, 1);
            //     }
            // }
            // return null;
        }
    }
})();
