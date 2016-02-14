adminController.PreferencesCtrl = function ($rootScope, $scope, SystemService, $uibModal) {


    $scope.loading=true;

    $scope.addQuestion=function(preference){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/question/main.html',
            controller: 'QuestionCtrl',
            size:'lg',
            resolve: {
                items: function () {

                    return {};
                }
            }
        });

        modalInstance.result.then(function (item) {

            preference.questions.push(item);

        }, function () {

        });
    };

    $scope.updateQuestion=function(preference, index){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/question/main.html',
            controller: 'QuestionCtrl',
            size:'lg',
            resolve: {
                items: function () {

                    return preference.questions[index];
                }
            }

        });

        modalInstance.result.then(function (item) {
            preference.questions[index]=item;
            $rootScope.success("Question Updated!");

        }, function () {

        });

    };

    $scope.deleteQuestion=function(preference, index){

        preference.questions.splice(index, 1);
        $rootScope.success("Question Deleted!");
    };

    $scope.create=function(){
        $rootScope.input("Enter Preference Group Name: ", "text", "Sitios, Negocios Sugeridos...", function(value){


            SystemService.preferences().create({}, {name_group:value}, function(result){
                if(result.error){ $rootScope.error(JSON.stringify(result.error)); return;}

                $rootScope.preferences.unshift(result.data);

                $rootScope.success("Preference Group Created!");

            }, function(){

                $rootScope.warning("Server Not Found");

            });

        });
    };

    $scope.save=function(preference){


        SystemService.preferences().update({id:preference._id}, preference, function(result){
            if(result.error){ $rootScope.error(result.error); return;}
            preference.editable=false;
            $rootScope.success("Saved!");

        }, function(){

            $rootScope.warning("Server Not Found");

        });
    };


    $scope.delete=function(preference, index){
        $rootScope.confirm("Are you sure?", function(){

            SystemService.categories().delete({id:preference._id}, preference, function(result){
                if(result.error){ $rootScope.error(JSON.stringify(result.error)); return;}

                $rootScope.preferences.splice(index, 1);

                $rootScope.success("Deleted!");

            }, function(){

                $rootScope.warning("Server Not Found");

            });


        });
    };

    this.ListPreferences=function(){

        SystemService.preferences().list({}, {}, function(result){
            if(result.error){  $rootScope.error(result.error); return;}
            $scope.loading=false;
            $rootScope.preferences=result.data;

            if($rootScope.preferences.length===0){
                $rootScope.warning("Warning! No preferences");
            }

        }, function(){

            $rootScope.warning("Server Not Found");

        });

    };

    this.ListPreferences();
};
