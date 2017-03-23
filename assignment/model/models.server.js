/**
 * Created by tushargupta on 3/22/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');


    var widgetModel = require("./widget/widget.model.server")();
    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();


    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };
    widgetModel.setModel(model);
    pageModel.setModel(model);
    websiteModel.setModel(model);
    userModel.setModel(model);

    mongoose.connection.on('connected', function(){
    });
    return model;
};