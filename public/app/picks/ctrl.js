adminController.PickCtrl = function ($rootScope, $scope, SystemService, $uibModal) {

    $scope.loading=true;

    $scope.delete=function(pick, index){
        $rootScope.confirm("Are you sure?", function(){

            SystemService.picks().delete({id:pick._id}, pick, function(result){
                if(result.error){ $rootScope.error(result.error); return;}

                fetch();

                $rootScope.success("Deleted!");

            }, function(){

                $rootScope.warning("Server Not Found");

            });


        });
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
            templateUrl: 'app/modals/pick-filter/main.html',
            controller: 'PickFilterModalCtrl',
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


            var pick_query=_.omit(query, []);

            query=_.merge(pick_query, filter_query);


            fetch();

        });

    };


    var ListPicks=function(query){
        query=query||{};

        SystemService.countPicks().get(query, function(res){
            $scope.page.totalItems=res.data;

        })


        SystemService.picks().list(query, function(result){
            if(result.error){  $rootScope.error(result.error); return;}

            $scope.loading=false;
            $rootScope.picks=result.data;



        }, function(){

            $rootScope.warning("Server Not Found");

        });

    };



    var fetch =function(){
        ListPicks(query);
    }

    fetch();







};
