(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http) {
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
            var newUser = {
                _id         : +new Date(),
                username    : user.username,
                password    : user.password,
                firstName   : user.firstname,
                lastName    : user.lastname,
                email       : user.email
            };
            return $http.post("/api/user", newUser);

        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);

        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/" + userId);
        }
    }
})();