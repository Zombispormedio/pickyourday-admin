adminController.ImageUploaderCtrl= function ($scope, $uibModalInstance) {

$scope.image={};
    $scope.ok = function () {
        $uibModalInstance.close($scope.image);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
