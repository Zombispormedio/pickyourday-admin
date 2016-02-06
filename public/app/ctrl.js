adminController.TabCtrl = function ($rootScope, $scope, OauthService) {

    $scope.logout = function () {
        OauthService.logout().Session({}, function(){
            deleteLocal("user");
            $rootScope.go("login");
        }, function(){

        });
    };

    $scope.goToCategories=function(){
        $rootScope.go("app.categories");
    };

    $scope.goToServices=function(){
        $rootScope.go("app.services");
    };
    $scope.goToCustomers=function(){
        $rootScope.go("app.customers");
    };
    $scope.goToCompanies=function(){
        $rootScope.go("app.companies");
    };
    $scope.goToPicks=function(){
        $rootScope.go("app.picks");
    };

    $scope.goToPreferences=function(){
        $rootScope.go("app.preferences");
    };



};
