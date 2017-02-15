(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;

        // event handlers
        vm.create = create;

        function init() {
        }
        init();

        function create(user) {
            if (user.password==user.passverify) {
                var newUser = UserService.createUser(user);
                if(newUser) {
                    $location.url("/user/"+newUser._id);
                }
                else {
                    vm.error = "User cannot be created";
                }
            }
            else {
                vm.error = "Passwords do not match"
            }
        }
    }
})();