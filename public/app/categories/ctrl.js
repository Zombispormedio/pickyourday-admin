adminController.CategoriesCtrl = function ($scope, SystemService) {

    this.ListCategories=function(){

        SystemService.categories().list({}, {}, function(result){
            if(result.error){ $scope.error=result.error; return;}

            $scope.categories=result.categories;

        }, function(){

            $scope.danger="Server Not Found";

        });

    };


    this.ListCategories();

};
