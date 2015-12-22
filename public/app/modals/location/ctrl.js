adminController.LocationCtrl= function ($scope, $uibModalInstance, items) {



    $scope.location=items;
    $scope.ok = function () {
        $uibModalInstance.close($scope.event);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
