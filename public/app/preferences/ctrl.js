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

                    return {

                    };
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

    $scope.manageRelationships = function (preference, index) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/relationship/main.html',
            controller: 'RelationShipCtrl',
            size: 'lg',
            resolve: {
                items: function () {


                    return {
                        current:preference.questions[index],
                        preferences:$scope.preferences,

                    }

                }
            }

        });

        modalInstance.result.then(function (item) {
            console.log(preference.questions);
            preference.questions[index].relations = item;
            $rootScope.success("Question Updated!");

        }, function () {

        });

    };

    $scope.create=function(){
        $rootScope.input("Enter Preference Group Name: ", "text", "Sitios, Negocios Sugeridos...", function(value){


            SystemService.preferences().create({}, {name_group:value}, function(result){
                if(result.error){ $rootScope.error(JSON.stringify(result.error)); return;}

                fetch();

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

            SystemService.preferences().delete({id:preference._id}, preference, function(result){
                if(result.error){ $rootScope.error(JSON.stringify(result.error)); return;}

                fetch();

                $rootScope.success("Deleted!");

            }, function(){

                $rootScope.warning("Server Not Found");

            });


        });
    };


    $scope.page={
        totalItems:0,
        current:1,
        sizeItems:5,
        size:4

    }
    $scope.searchObject={

    }

    var query= {p:$scope.page.current-1, s:$scope.page.sizeItems};

    $scope.changePagination=function(){
        query.p=$scope.page.current-1;
        query.s=$scope.page.sizeItems;
        fetch();
    }

    $scope.searchByText=function(){
        query.search_text=$scope.searchObject.text;
        if(query.search_text===""){
            delete query.search_text;
        }
        fetch();
    };
    $scope.openFilterModal=function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/preferences-filter/main.html',
            controller: 'PreferencesFilterModalCtrl',
            size:'lg',
            resolve: {
                items: function () {

                    return $scope.searchObject;
                }
            }

        });

        modalInstance.result.then(function (item) {

            var filter_query=_.transform(item, function(result, value, key) {
                if(value!=void 0&& value!==""){

                    result[key]=value;

                }


            }, {});


            var pick_query=_.omit(query, ["name",
                                          "question_id",
                                          "question_text",
                                          "question_type",
                                          "question_options",
                                          "relation_id",
                                          "relation_answer",
                                          "question_keywords"]);

            query=_.merge(pick_query, filter_query);


            fetch();

        });

    };

    var ListPreferences=function(query){

        query=query||{};

        SystemService.countPreferences().get(query, function(res){
            $scope.page.totalItems=res.data;

        })
        SystemService.preferences().list(query, function(result){
            if(result.error){  $rootScope.error(result.error); return;}
            $scope.loading=false;
            $scope.preferences=result.data;


        }, function(){

            $rootScope.warning("Server Not Found");

        });

    };

    var fetch =function(){
        ListPreferences(query);
    }

    fetch();

};
