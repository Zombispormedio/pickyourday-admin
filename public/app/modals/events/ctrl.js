adminController.EventsCtrl= function ($scope, $uibModalInstance, items) {



    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();


    $scope.event=items||{};
    $scope.ok = function () {
        $scope.event.dateCreated=new Date();

        $uibModalInstance.close($scope.event);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
