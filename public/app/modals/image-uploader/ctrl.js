adminController.ImageUploaderCtrl= function ($scope, $uibModalInstance, SystemService) {

    $scope.image={};
    $scope.loading=false;
    $scope.openFile=function(){
        document.getElementById("file").click();
    };

    $scope.$watch("image.data", function(){
        var data=$scope.image.data;
        if(data){
            $scope.loading=true;
            SystemService.images().upload({type:"data"}, data, function(res){
                $scope.loading=false;
                $scope.image.src=res.data.src;
            });

        }

    });

    $scope.uploadByUrl=function(){
        var url=$scope.image.url;

        if(url&&url!==""){
            $scope.loading=true;
            SystemService.images().upload({type:"url"}, {url:url}, function(res){
                $scope.loading=false;
                $scope.image.src=res.data.src;
            });
        }

    };

    $scope.ok = function () {

            $uibModalInstance.close($scope.image);

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
