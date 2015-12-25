adminController.ImageUploaderCtrl= function ($scope, $uibModalInstance, SystemService) {

    $scope.image={};

    $scope.openFile=function(){
        document.getElementById("file").click();
    };

    $scope.$watch("image.data", function(){
        var data=$scope.image.data;
        if(data){

            SystemService.images().upload({type:"data"}, data, function(res){
                console.log(res);
            });

        }

    });

    $scope.uploadByUrl=function(){
        var url=$scope.image.url;
        if(url!==""){
            SystemService.images().upload({type:"url"}, {url:url}, function(res){
                console.log(res);
            });
        }

    };

    $scope.ok = function () {
        console.log($scope.image);
        /*
        $uibModalInstance.close($scope.image);*/
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
