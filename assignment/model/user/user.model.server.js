/**
 * Created by tushargupta on 3/22/17.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema ;
    var UserModel ;

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        setModel: setModel,
        getModel: getModel
    };
    return api;

    function setModel(_model) {
        model = _model;
        UserSchema = require("./user.schema.server")(model);
        UserModel = mongoose.model("userModel", UserSchema);

    }
    function getModel() {
        return UserModel;
    }


    function createUser(user) {

        return UserModel.create(user);

    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function updateUser(userId, user) {
        return UserModel
            .update(
                {
                    _id: userId
                },
                {
                    $set: user
                }
            );
    }

    function deleteUser(userId) {
        return UserModel.findByIdAndRemove(userId, function (err,user) {
            user.remove();
        });


    }

    function findUserByCredentials(username, password) {
        return UserModel.find({
            username: username,
            password: password
        });
    }

    function findUserByUsername(username) {
        return UserModel.find({
            username: username
        });
    }
};