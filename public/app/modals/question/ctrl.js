adminController.QuestionCtrl= function ($scope, $uibModalInstance, items) {


    $scope.types=[{name:"Yes/No", value:"yes_no"}, {name:"Keywords", value:"keywords"}, {name:"Options", value:"options"}];
    $scope.question=items;


    $scope.changeQuestionType=function(value){
        if($scope.question.type==="options" && value!=="options") delete $scope.question.options;
        $scope.question.type=value;
    };

    $scope.addOption=function(question){



        if(!$scope.question.options) $scope.question.options=[];

        if(question.tempOpt!==""){

            $scope.question.options.push(question.tempOpt);

            delete question.tempOpt;
        }

    };

    $scope.deleteOption=function(index){
        $scope.question.options.splice(index, 1);
    };
    
    $scope.addKeyword=function(question){



        if(!$scope.question.keywords) $scope.question.keywords=[];

        if(question.tempKeyword!==""){

            $scope.question.keywords.push(question.tempKeyword);

            delete question.tempKeyword;
        }

    };

    $scope.deleteKeyword=function(index){
        $scope.question.keywords.splice(index, 1);
    };


    $scope.ok = function () {

        if($scope.question.text!=="" && $scope.question.type)
            $uibModalInstance.close($scope.question);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
