adminController.ServicesCtrl = function ($rootScope, $scope, SystemService) {

    $scope.loading=true;
    $scope.create=function(){
        $rootScope.input("Enter Service Name: ", "text", "Cortar Pelo, extracción de molares...", function(value){


            SystemService.default_services().create({}, {name:value}, function(result){

                if(result.error){ $rootScope.error(result.error); return;}

                $scope.services.unshift(result.default_service);

                $rootScope.success("Default Service Created!");

            }, function(){

                $rootScope.warning("Server Not Found");

            });

        });
    };


    $scope.save=function(service){
        SystemService.default_services().update({id:service._id}, service, function(result){
            if(result.error){ $rootScope.error(result.error); return;}
            service.editable=false;
            $rootScope.success("Saved!");

        }, function(){

            $rootScope.warning("Server Not Found");

        });
    };


    $scope.delete=function(service, index){
        $rootScope.confirm("Are you sure?", function(){

            SystemService.default_services().delete({id:service._id}, service, function(result){
                if(result.error){ $rootScope.error(result.error); return;}

                $scope.services.splice(index, 1);

                $rootScope.success("Deleted!");

            }, function(){

                $rootScope.warning("Server Not Found");

            });


        });
    };


    this.ListServices=function(){

        SystemService.default_services().list({}, {}, function(result){
            if(result.error){  $rootScope.error(result.error); return;}
            $scope.loading=false;
            $scope.services=result.default_services;

            if($rootScope.services.length===0){
                $rootScope.warning("Warning! No Services");
            }

        }, function(){

            $rootScope.warning("Server Not Found");

        });

    };


    $scope.dynamicPopover = {
        templateUrl: 'KeywordPopover.html',
        title: "Add Keyword"
    };

    $scope.addTag=function(service){
        service.keywords.push(service.tempTag);
        service.tempTag="";
    };

    $scope.deleteKeyword=function(service, index){
        service.keywords.splice(index, 1);

    };





    this.ListServices();

};
