adminController.PickFilterModalCtrl= function ($scope, $uibModalInstance, items) {

    $scope.filter=items;
    $scope.ok = function () {
  

            $uibModalInstance.close($scope.filter);
        
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
