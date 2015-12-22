adminController.LocationCtrl= function ($scope, $uibModalInstance, items) {



    $scope.location=items;
    if(!$scope.location.name){
        $scope.location.name="Example";
    }

    $scope.ok = function () {
        $uibModalInstance.close($scope.location);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
