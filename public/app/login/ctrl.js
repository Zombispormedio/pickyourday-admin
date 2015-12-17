adminController.LoginCtrl = function ($rootScope, $scope, OauthService ) {

    $scope.error="";
    $scope.user = {};
    $scope.login = function () {
        OauthService.login().Session($scope.user, function(res){
            if (!res.error) {
                saveLocal("user", res.data);
                $rootScope.go("app");
            } else {
                $scope.error=res.error;
            }
        }, function(){
            $scope.error="Server Not Found";
        });

    };

    $scope.cleanError=function(){
        $scope.error="";
    };
};
