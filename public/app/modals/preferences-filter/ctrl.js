adminController.PreferencesFilterModalCtrl= function ($scope, $uibModalInstance, items) {

    $scope.filter=items;
    
     $scope.clean=function(){
        $scope.filter={};
    }
    
    $scope.ok = function () {
        $uibModalInstance.close($scope.filter);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
