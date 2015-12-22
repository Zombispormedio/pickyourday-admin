adminController.CompanyModalCtrl= function ($scope, $uibModalInstance) {


    $scope.ok = function () {
        if($scope.category){

            $uibModalInstance.close($scope.category);
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
