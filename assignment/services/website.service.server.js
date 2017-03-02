/**
 * Created by tushargupta on 2/28/17.
 */
module.exports = function (app) {

    var websites = [
        {"_id": "123", "name": "Facebook", update: new Date(), "developerId": "456", "description": "Lorem"},
        {"_id": "234", "name": "Tweeter", update: new Date(), "developerId": "456", "description": "Lorem"},
        {"_id": "456", "name": "Gizmodo", update: new Date(), "developerId": "456", "description": "Lorem"},
        {"_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem"},
        {"_id": "678", "name": "Checkers", update: new Date(), "developerId": "123", "description": "Lorem"},
        {"_id": "789", "name": "Chess", update: new Date(), "developerId": "234", "description": "Lorem"}
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res){
        var newWebsite = req.body;
        console.log(newWebsite);
        websites.push(newWebsite);
        res.json(newWebsite);
    }

    function findAllWebsitesForUser(req, res) {

        var userId = req.params.userId;

        var result = [];

        for (var w in websites) {

            var website = websites[w];

            if (website.developerId === userId) {
                result.push(website);
            }
        }
        res.json(result);

    }

    function findWebsiteById(req, res) {

        var websiteId = req.params.websiteId;
        console.log(websiteId);
        var websiteFound = null;

        for (var w in websites) {
            var website = websites[w];
            if (website._id == websiteId) {
                websiteFound = website;
                break;
            }
        }
        res.json(websiteFound);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        var updatedWebsite = null;
        for (var w in websites) {
            var curWebSite = websites[w];
            if (curWebSite._id === websiteId) {
                curWebSite.name = website.name;
                curWebSite.description = website.description;
                updatedWebsite = curWebSite;
                break;
            }
        }
        res.json(updatedWebsite);
    }

    function deleteWebsite(req, res) {

        var websiteId = req.params.websiteId;

        for (var index = 0; index < websites.length; index++) {
            if (websites[index]._id == websiteId) {
                websites.splice(index, 1);
                res.sendStatus(200);
                return;
            }
        }

        res.sendStatus(400);

    }

}