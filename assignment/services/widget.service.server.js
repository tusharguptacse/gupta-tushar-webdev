/**
 * Created by tushargupta on 3/1/17.
 */
module.exports = function(app) {

    var widgets =
        [
            {
                "_id": "123",
                "widgetType": "HEADER",
                "pageId": "321",
                "size": 2,
                "text": "GIZMODO",
                "name": "",
                "index": 1
            },
            {
                "_id": "234",
                "widgetType": "HEADER",
                "pageId": "321",
                "size": 4,
                "text": "Lorem ipsum",
                "name": "",
                "index": 2
            },
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://i.imgur.com/dfjYx2a.jpg", "name": "", "index": 5
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "name": "", "index": 4},
            {
                "_id": "567",
                "widgetType": "HEADER",
                "pageId": "321",
                "size": 4,
                "text": "Lorem ipsum",
                "name": "",
                "index": 0
            },
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E", "name": "", "index": 3
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "name": "", "index": 6}
        ];

    var options =
        [1, 2, 3, 4, 5, 6];


    var multer = require('multer'); // npm install multer --save

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/options", getOptions);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pageId/widget", updateWidgetOrder);

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        var newWidget = req.body;
        var pageId = newWidget.pageId;
        var highestIndex = -1;

        for (var i = 0; i < widgets.length; i++) {

            if (widgets[i].pageId == pageId) {

                var index = widgets[i].index;
                if (index > highestIndex) {
                    highestIndex = index;
                }
            }
        }

        newWidget.index = highestIndex + 1;

        widgets.push(newWidget);
        res.send(newWidget);
    }

    function findAllWidgetsForPage(req, res) {

        var pageId = req.params.pageId;

        var result = [];

        for (var w in widgets) {

            var widget = widgets[w];

            if (widget.pageId === pageId) {
                result.push(widget);
            }
        }
        var sortedWidgetList = result.sort(function (widgeta, widgetb) {
            return widgeta.index > widgetb.index;
        });

        res.json(sortedWidgetList);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        var widgetFound = null;

        for (var w in widgets) {
            var widget = widgets[w];
            if (widget._id === widgetId) {
                widgetFound = widget;
                break
            }
        }
        res.json(widgetFound);
    }

    function getOptions(req, res) {
        res.json(options);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        var updatedWidget = null;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets[w] = widget;
                updatedWidget = widget;
                break;
            }
        }

        res.json(updatedWidget);
    }

    function deleteWidget(req, res) {

        var widgetId = req.params.widgetId;

        var deleteSuccessful = 400;
        var totalWidgets = widgets.length;
        for (var index = 0; index < totalWidgets; index++) {
            if (widgets[index]._id === widgetId) {
                var pageId = widgets[index].pageId;
                var deleteIndex = widgets[index].index;
                widgets.splice(index, 1);
                updateIndexesAfterDelete(deleteIndex, pageId, totalWidgets - 1);
                deleteSuccessful = 200;
                break;
            }
        }
        res.sendStatus(deleteSuccessful);
    }

    function updateIndexesAfterDelete(deletedIndex, deletedWidgetPageId) {
        var widgetsToUpdate = widgets.filter(function (w) {
            return w.pageId == deletedWidgetPageId;
        });
        for (var index = 0; index < widgetsToUpdate.length; index++) {
            console.log(widgetsToUpdate[index].index);
            if (widgetsToUpdate[index].index > deletedIndex) {
                widgetsToUpdate[index].index--;
            }
        }

    }


    function uploadImage(req, res) {
        var pageId = null;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var myFile = req.file;
        var destination = myFile.destination; // folder where file is saved to

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                pageId = widgets[i].pageId;
            }
        }

        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    }

    function updateWidgetOrder(req, res) {
        var pageId = req.params.pageId;

        var startIndex = parseInt(req.query.initial);
        var endIndex = parseInt(req.query.final);

        var currentPageWidgets = widgets.filter(function (w) {
            return w.pageId === pageId;
        });

        var pervWidget = currentPageWidgets.find(function (w) {
            return w.index === startIndex;
        });
        var finalIndex = endIndex;
        var increment = false;
        if (startIndex > endIndex) {
            endIndex = startIndex + endIndex;
            startIndex = endIndex - startIndex;
            endIndex = endIndex - startIndex;
            finalIndex = startIndex;
            increment = true;
        }


        for (var index = 0; index < currentPageWidgets.length; index++) {
            var currentWidget = currentPageWidgets[index];
            if ((currentWidget.index >= startIndex) && (currentWidget.index <= endIndex)) {
                console.log("PREV index");
                console.log(currentWidget.index);
                if (!increment) {
                    currentPageWidgets[index].index--;
                }

                else {
                    currentPageWidgets[index].index++;
                }
                console.log("new index");
                console.log(currentPageWidgets[index].index);
            }
        }
        pervWidget.index = finalIndex;
        res.sendStatus(200);
    }
}