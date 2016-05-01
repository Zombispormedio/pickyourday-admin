adminController.ServicesCtrl = function ($rootScope, $scope, SystemService, $uibModal) {

    $scope.loading=true;
    $scope.create=function(){
        $rootScope.input("Enter Service Name: ", "text", "Cortar Pelo, extracción de molares...", function(value){


            SystemService.default_services().create({}, {name:value}, function(result){

                if(result.error){ $rootScope.error(result.error); return;}

                fetch();

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

                fetch();

                $rootScope.success("Deleted!");

            }, function(){

                $rootScope.warning("Server Not Found");

            });


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
    
    
    
    $scope.page={
        totalItems:0,
        current:1,
        sizeItems:5,
        size:4

    }
    $scope.searchObject={

    }

    var query= {p:$scope.page.current-1, s:$scope.page.sizeItems};

    $scope.changePagination=function(){
        query.p=$scope.page.current-1;
        query.s=$scope.page.sizeItems;
        fetch();
    }

    $scope.searchByText=function(){
        query.search_text=$scope.searchObject.text;
        if(query.search_text===""){
            delete query.search_text;
        }
        fetch();
    };
    $scope.openFilterModal=function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/service-filter/main.html',
            controller: 'ServiceFilterModalCtrl',
            size:'lg',
            resolve: {
                items: function () {

                    return $scope.searchObject;
                }
            }

        });

        modalInstance.result.then(function (item) {
          
            var filter_query=_.transform(item, function(result, value, key) {
                if(value!=void 0&& value!==""){
                    
                     result[key]=value;
                    
                }
                   
              
            }, {});
            
     
            var pick_query=_.omit(query, ['greaterDuration', 'lessDuration',
                                          'greaterPrice','lessPrice',
                                          'toDateCreated','fromDateCreated',
                                          'category',"by_name","keywords_seq"]);
        
            query=_.merge(pick_query, filter_query);
           

            fetch();

        });

    };
    
    

    var ListServices=function(query){

        query=query||{};

        SystemService.countDefaultServices().get(query, function(res){
            $scope.page.totalItems=res.data;

        })
        SystemService.default_services().list(query, function(result){
            if(result.error){  $rootScope.error(result.error); return;}
            $scope.loading=false;
            $rootScope.services=result.data;



        }, function(){

            $rootScope.warning("Server Not Found");

        });

    };




    $rootScope.ListCategories();
    var fetch =function(){
        ListServices(query);
    }

    fetch();

};
