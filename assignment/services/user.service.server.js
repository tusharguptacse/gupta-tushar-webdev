/**
 * Created by tushargupta on 2/28/17.
 */
module.exports = function (app, userModel) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete('/api/user/:userId', deleteUser);



    // var users = [
    //     {
    //         _id: "123",
    //         username: "alice",
    //         password: "alice",
    //         firstName: "Alice",
    //         lastName: "Wonder",
    //         email: "alice@gmail.com"
    //     },
    //     {
    //         _id: "234",
    //         username: "bob",
    //         password: "bob",
    //         firstName: "Bob",
    //         lastName: "Marley",
    //         email: "bob@gmail.com"
    //     },
    //     {
    //         _id: "345",
    //         username: "charly",
    //         password: "charly",
    //         firstName: "Charly",
    //         lastName: "Garcia",
    //         email: "charly@gmail.com"
    //     },
    //     {
    //         _id: "456",
    //         username: "jannunzi",
    //         password: "jannunzi",
    //         firstName: "Jose",
    //         lastName: "Annunzi",
    //         email: "jannunzi@gmail.com"
    //     }
    // ];

    function updateUser(req, res){
        var uid = req.params.userId;
        var user = req.body;
        userModel
            .updateUser(uid, user)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });


        // for (var u in users) {
        //     if (users[u]._id == userId) {
        //         users[u].firstName  = newUser.firstName;
        //         users[u].lastName   = newUser.lastName;
        //         users[u].email      = newUser.email;
        //         res.json(users[u]);
        //         return;
        //     }
        }

    function findUserById(req, res){
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    }
                    else {
                        res.send(null);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });

    }

    function findUser(req, res) {
        var params = req.params;
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(req, res);
        }
        else if (username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;

        userModel
            .findUserByUsername(username)
            .then(
                function (users) {
                    console.log(users.length);
                    if (users.length > 0) {
                        res.json(users[0]);
                    }
                    else {
                        res.sendStatus(400);
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err)
                });


        // var user = users.find(function (u) {
        //     return u.username == req.query.username;
        // });
        // if(user) {
        //     res.json(user);
        //     return;
        // }
        // else {
        //     res.sendStatus(404);
        //     return;
        // }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        console.log("find user by cred service");
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (users) {
                    if (users.length > 0) {
                        res.json(users[0]);
                    }
                    else {
                        res.send(null);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        // var user = users.find(function(user){
        //     return user.password == password && user.username == username;
        // });
        // console.log(user);
        // res.json(user);
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(newUser) {
                    res.send(newUser);
                }, function(err) {
                    res.sendStatus(400).send(error);
                });

        //
        // users.push(user);
        // res.json(user);
    }

    function deleteUser(req, res) {
        var uid = req.params.userId;

        userModel
            .deleteUser(uid)
            .then(
                function(status) {
                    res.sendStatus(200);
                }, function(err) {
                    res.sendStatus(400).send(error);
                }
            );


        // for (var u in users) {
        //     if (users[u]._id == uid) {
        //         users.splice(u, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
    }
};