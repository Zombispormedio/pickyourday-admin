adminController.TabCtrl = function ($rootScope, $scope, OauthService, $state) {
 
    $scope.state={
        current:$state.current.url&&$state.current.url!==""?$state.current.url:"customers"
    };
    console.log($state);
    console.log( $scope.state)
    
    $scope.logout = function () {
        OauthService.logout().Session({}, function(){
            deleteLocal("user");
            $rootScope.go("login");
        }, function(){

        });
    };

    $scope.goToCategories=function(){
        $scope.state.current="categories";
        $rootScope.go("app.categories");
    };

    $scope.goToCompaniesRequest=function(){
        $scope.state.current="companies-request";
        $rootScope.go("app.companiesRequest");
    };

    $scope.goToServices=function(){
          $scope.state.current="services";
        $rootScope.go("app.services");
    };
    $scope.goToCustomers=function(){
          $scope.state.current="customers";
        $rootScope.go("app.customers");
    };
    $scope.goToCompanies=function(){
          $scope.state.current="companies";
        $rootScope.go("app.companies");
    };
    $scope.goToPicks=function(){
          $scope.state.current="picks";
        $rootScope.go("app.picks");
    };

    $scope.goToPreferences=function(){
          $scope.state.current="preferences";
        $rootScope.go("app.preferences");
    };



};
