adminController.CategoriesCtrl = function ($rootScope, $scope, SystemService, $uibModal) {

    $scope.loading=true;
    $scope.create=function(){
        $rootScope.input("Enter Category Name: ", "text", "Automoción, belleza, administración...", function(value){


            SystemService.categories().create({}, {name:value}, function(result){
                if(result.error){ $rootScope.error(result.error); return;}

                $rootScope.categories.unshift(result.category);

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






    this.ListCategories=function(){

        SystemService.categories().list({}, {}, function(result){
            if(result.error){  $rootScope.error(result.error); return;}
            $scope.loading=false;
            $rootScope.categories=result.categories;

            if($rootScope.categories.length===0){
                $rootScope.warning("Warning! No categories");
            }

        }, function(){

            $rootScope.warning("Server Not Found");

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





    this.ListCategories();

};
