adminController.TabCtrl = function ($rootScope, $scope, OauthService) {

    $scope.logout = function () {
        OauthService.logout().Session({}, function(){
            deleteLocal("user");
            $rootScope.go("login");
        }, function(){

        });
    };
};
