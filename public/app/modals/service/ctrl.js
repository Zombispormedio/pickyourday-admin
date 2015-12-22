adminController.ServiceCtrl= function ($rootScope, $scope, $uibModalInstance, items) {


    $scope.default_active=0;
    $scope.default_services=$rootScope.services.map(function(a, index){

        a.active=false;

        if(items.id_name){
            if(a._id===items.id_name){
                a.active=true;
            }
        }else{
            if(index===0 ){
                a.active=true;
            }
        }
        return a;
    });

    $scope.service=items;
    $scope.selectedDefault=function(index){
        $scope.default_services=$scope.default_services.map(function(a, i){
            a.active=false;
            if(index===i){
                a.active=true;
            }
            return a;
        });
        $scope.default_active=index;
    };

    $scope.ok = function () {
        $scope.service.default=$scope.default_services[$scope.default_active];
        $scope.service.id_name=$scope.service.default._id;
        $scope.service.dateCreated=new Date();
        $uibModalInstance.close($scope.service);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
