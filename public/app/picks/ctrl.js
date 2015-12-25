adminController.PickCtrl = function ($rootScope, $scope, SystemService) {

    $scope.loading=true;

    $scope.delete=function(pick, index){
        $rootScope.confirm("Are you sure?", function(){

            SystemService.picks().delete({id:pick._id}, pick, function(result){
                if(result.error){ $rootScope.error(result.error); return;}

                $rootScope.picks.splice(index, 1);

                $rootScope.success("Deleted!");

            }, function(){

                $rootScope.warning("Server Not Found");

            });


        });
    };



    this.ListPicks=function(){

        SystemService.picks().list({}, {}, function(result){
            if(result.error){  $rootScope.error(result.error); return;}

            $scope.loading=false;
            $rootScope.picks=result.picks;

            if($rootScope.picks.length===0){
                $rootScope.warning("Warning! No Picks");
            }

        }, function(){

            $rootScope.warning("Server Not Found");

        });

    };







  //  this.ListPicks();

};
