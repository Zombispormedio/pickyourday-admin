adminController.ServiceCtrl= function ($rootScope, $scope, $uibModalInstance, items) {


    $scope.default_active=0;
    $scope.service=items.service;
    $scope.default_services=$rootScope.services
        .filter(function(a){return a.category===items.category})
        .map(function(a, index){

        a.active=false;

        if($scope.service.id_name){
            if(a._id===$scope.service.id_name){
                a.active=true;
            }
        }else{
            if(index===0 ){
                a.active=true;
            }
        }
        return a;
    });

    
    $scope.selectedDefault=function(index){
        $scope.default_services=$scope.default_services.map(function(a, i){
            a.active=false;
            if(index===i){
                 $scope.service.id_name=a._id;
                a.active=true;
            }
            return a;
        });
       
    };

    $scope.ok = function () {

        $scope.service.dateCreated=new Date();
        $uibModalInstance.close($scope.service);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
