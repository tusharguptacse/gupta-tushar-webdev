(function () {
    angular
        .module("WebAppMaker")
        .service("PageService", pageService);

    function pageService() {
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
            var newPage = {};

            newPage = {
                _id         : + new Date(),
                name        : page.name,
                websiteId   : webId,
                description : page.des
            };

            pages.push(newPage);
            return newPage;
        }


        function findPageById(pageId) {
            for(var p in pages) {
                if(pageId === pages[p]._id) {
                    return pages[p];
                }
            }
            return null;
        }

        function findPageByWebsiteId(websiteId) {
            var pagelist = [];
            for(var p in pages) {
                if(websiteId === pages[p].websiteId) {
                    pagelist.push(pages[p]);
                }
            }
            return pagelist;
        }

        function updatePage(pageId, page) {
            for(var p in pages) {
                if( pages[p]._id == pageId ) {
                    pages[p].name = page.name;
                    pages[p].description = page.description;
                    return pages[p];
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for(var p in pages) {
                if( pages[p]._id == pageId ) {
                    return pages.splice(p, 1);
                }
            }
            return null;
        }
    }
})();
