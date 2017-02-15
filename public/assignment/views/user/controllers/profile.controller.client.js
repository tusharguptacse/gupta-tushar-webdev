(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;

        // event handlers
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUsers;

        function init() {
            vm.userId = $routeParams['uid'];
            var user = UserService.findUserById(vm.userId);
            console.log(user);
            vm.user = user;

        }
        init();

        function updateUser(newUser) {
            var user = UserService.updateUser(vm.userId, newUser);
            if(user != null) {
                vm.message = "User Successfully Updated!"
            } else {
                vm.error = "Unable to update user";
            }
        }

        function deleteUsers() {
            var user = UserService.deleteUser(vm.userId);
            if(user != null) {
                vm.message = "User Successfully Deleted!"
            } else {
                vm.error = "Unable to delete user   ";
            }
        }
    }
})();