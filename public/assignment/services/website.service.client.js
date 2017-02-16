(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            {"_id": "123", "name": "Facebook", update: new Date(), "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", update: new Date(), "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", update: new Date(), "developerId": "456", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", update: new Date(), "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", update: new Date(), "developerId": "234", "description": "Lorem"}
        ];


        var api = {
            "createWebsite"     : createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById"   : findWebsiteById,
            "updateWebsite"     : updateWebsite,
            "deleteWebsite"     : deleteWebsite
        };
        return api;


        function createWebsite(userId, website) {
            var newWebsite = {};

            newWebsite = {
                _id         : +new Date(),
                name        : website.name,
                developerId : userId,
                description : website.des
            };

            websites.push(newWebsite);
            return newWebsite;
        }


        function findWebsiteById(websiteId) {
            for (var w in websites) {
                if (websiteId === websites[w]._id) {
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function findWebsitesByUser(userId) {
            var sites = [];
            for (var w in websites) {
                if (userId === websites[w].developerId) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }

        function updateWebsite(websiteId, website) {
            for (var w in websites) {
                if (websites[w]._id == websiteId) {
                    websites[w].name = website.name;
                    websites[w].description = website.description;
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function deleteWebsite(websiteId) {
            for (var w in websites) {
                if (websites[w]._id == websiteId) {
                    return websites.splice(w, 1);
                }
            }
            return null;
        }
    }
})();