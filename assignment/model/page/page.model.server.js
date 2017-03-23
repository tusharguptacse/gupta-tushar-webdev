/**
 * Created by tushargupta on 3/22/17.
 */
module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var PageSchema ;
    var PageModel ;



    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        deleteBulkPages: deleteBulkPages,
        setModel: setModel,
        getModel: getModel
    };
    return api;

    function setModel(_model) {
        model = _model;
        PageSchema = require('./page.schema.server')(_model);
        PageModel = mongoose.model("pageModel", PageSchema);


    }

    function getModel() {
        return PageModel;
    }

    function createPage(websiteId, page) {
        //page._website = websiteId;
        //return PageModel.create(page);

        return PageModel
            .create(page)
            .then(
                function (newPage) {
                    console.log(newPage);
                    return model
                        .websiteModel
                        .findWebsiteById(websiteId)
                        .then(
                            function (website) {
                                website.pages.push(newPage);
                                newPage._website = website._id;
                                website.save();
                                newPage.save();
                                return newPage;

                            },
                            function (error) {
                                console.log(error);
                            }
                        );
                },
                function (error) {
                    console.log(error);
                });
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({"_website": websiteId});
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }

    function updatePage(pageId, page) {
        return PageModel
            .update({
                    _id: pageId
                },
                {
                    $set: page
                });
    }

    function deleteBulkPages(arrPageId) {
        return PageModel.remove({'_id': {'$in': arrPageId}});
    }

    function deletePage(pageId) {
        return PageModel.findByIdAndRemove(pageId, function (err,page) {
            page.remove();
        });
    }
};