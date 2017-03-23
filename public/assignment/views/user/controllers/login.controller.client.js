(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController($location, UserService) {
        var vm = this;

        // event handlers


        function init() {
            vm.login = login;
            vm.error = null;
        }

        init();

        function login(user) {
            if (user != null) {

                var promise = UserService
                    .findUserByCredentials(user.username, user.password);

                promise.success(function(user) {
                    if (user.length != 0) {
                        $location.url("/user/" + user._id);
                    }
                    else {
                        vm.error = "User not found!";
                    }
                });
            }

            else {
                vm.error = "Please enter details!"
            }
        }
    }
})();