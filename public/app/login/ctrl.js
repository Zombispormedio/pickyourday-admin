adminController.LoginCtrl = function ($rootScope, $scope, OauthService , ConfigService) {

    $scope.error="";
    $scope.user = {};
    $scope.login = function () {

        async.waterfall([

            function login(next){

                OauthService.login().Session($scope.user, function(res){
                    if(res.error)return next(res.error);

                    next(null, res.data);

                }, ConfigService.ServerNotFound(next));

            }, 
            function checkRole(user, next){
                OauthService.role().check({role:user.role}, function(res){
                    if(res.error)return next(res.error);

                    if(res.data==0){
                    
                        next(null, user);
                    }else{
                        ConfigService.NoRoleAuthorized(next)();
                    }

                }, ConfigService.ServerNotFound(next));
            }



        ], function(err, user){
            if(err)return $rootScope.warning(err);
                saveLocal("user", user);
              $rootScope.go("app");
        });


    };

    $scope.cleanError=function(){

    };
};
