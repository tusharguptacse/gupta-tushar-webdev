(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {
                _id: "123",
                username: "alice",
                password: "alice",
                firstName: "Alice",
                lastName: "Wonder",
                email: "alice@gmail.com"
            },
            {
                _id: "234",
                username: "bob",
                password: "bob",
                firstName: "Bob",
                lastName: "Marley",
                email: "bob@gmail.com"
            },
            {
                _id: "345",
                username: "charly",
                password: "charly",
                firstName: "Charly",
                lastName: "Garcia",
                email: "charly@gmail.com"
            },
            {
                _id: "456",
                username: "jannunzi",
                password: "jannunzi",
                firstName: "Jose",
                lastName: "Annunzi",
                email: "jannunzi@gmail.com"
            }
        ];

        var api = {
            "createUser": createUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "findUserByUsername": findUserByUsername
        };
        return api;

        function createUser(user) {
            var checkuser = findUserByUsername(user.username);
            var newUser = {};

            if (checkuser == null) {
                newUser = {
                    _id         : +new Date(),
                    username    : user.username,
                    password    : user.password,
                    firstName   : user.firstname,
                    lastName    : user.lastname,
                    email       : user.email
                };

                users.push(newUser);
                return newUser;
            }
            return null;

        }

        function updateUser(userId, newUser) {
            for (var u in users) {
                if (users[u]._id == userId) {
                    users[u].firstName  = newUser.firstName;
                    users[u].lastName   = newUser.lastName;
                    users[u].email      = newUser.email;
                    return users[u];
                }
            }
            return null;
        }

        function findUserById(userId) {
            for (var u in users) {
                if (users[u]._id == userId) {
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        function findUserByUsername(userName) {
            for (var u in users) {
                if (users[u].username == userName) {
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var u in users) {
                if (users[u].username == username &&
                    users[u].password == password) {
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for (var u in users) {
                if (users[u]._id == userId) {
                    return users.splice(u, 1);
                }
            }
            return null;
        }
    }
})();