adminController.CategoriesCtrl = function ($rootScope, $scope, SystemService, $uibModal) {

    $scope.loading=true;
    $scope.create=function(){
        $rootScope.input("Enter Category Name: ", "text", "Automoción, belleza, administración...", function(value){


            SystemService.categories().create({}, {name:value}, function(result){
                if(result.error){ $rootScope.error(result.error); return;}

                $rootScope.categories.unshift(result.data);

                $rootScope.success("Category Created!");

            }, function(){

                $rootScope.warning("Server Not Found");

            });

        });
    };


    $scope.save=function(category){


        SystemService.categories().update({id:category._id}, category, function(result){
            if(result.error){ $rootScope.error(result.error); return;}
            category.editable=false;
            $rootScope.success("Saved!");

        }, function(){

            $rootScope.warning("Server Not Found");

        });
    };


    $scope.delete=function(category, index){
        $rootScope.confirm("Are you sure?", function(){

            SystemService.categories().delete({id:category._id}, category, function(result){
                if(result.error){ $rootScope.error(result.error); return;}

                $rootScope.categories.splice(index, 1);

                $rootScope.success("Deleted!");

            }, function(){

                $rootScope.warning("Server Not Found");

            });


        });
    };





    $scope.open = function (category) {


        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/image-uploader/main.html',
            controller: 'ImageUploaderCtrl'

        });

        modalInstance.result.then(function (item) {

            category.image=item;

        }, function () {

        });
    };

    $scope.uploadIcon=function(category){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/image-uploader/main.html',
            controller: 'ImageUploaderCtrl'
        });

        modalInstance.result.then(function (item) {

            category.icon=item;

        }, function () {

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
            templateUrl: 'app/modals/category-filter/main.html',
            controller: 'CategoryFilterModalCtrl',
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
    
  var ListCategories=function(query){
       query=query||{};

         SystemService.countCategories().get(query, function(res){
            $scope.page.totalItems=res.data;

        })

        SystemService.categories().list(query, function(result){
            if(result.error){  $rootScope.error(result.error); return;}
            $scope.loading=false;
            $rootScope.categories=result.data;


        }, function(){

            $rootScope.warning("Server Not Found");

        });

    };




     var fetch =function(){
       ListCategories(query);
    }

    fetch();




};
