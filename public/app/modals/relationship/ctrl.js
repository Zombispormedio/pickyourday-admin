adminController.RelationShipCtrl= function ($scope, $uibModalInstance, items) {

    var preferences = [];
   angular.copy(items.preferences, preferences);
   $scope.questions = preferences.reduce(function (prev, a) {

       a.questions.forEach(function (b) {
           if (b._id !== items.current._id) {
               var relation = _.find(items.current.relations, function (p) {
                   return p.question === b._id
               });

               if (relation) {
                   b.related = true;
                   b["answer_" + b.type] = relation.answer;

               }
               b.name_group = a.name_group;
               prev.push(b);
           }

       });
       return prev;
   }, []);

    $scope.show=function(q){
       
        q.showCondition=!q.showCondition&&q.related;
      
    }
   $scope.ok = function () {
       
       $scope.relationship=$scope.questions.reduce(function(prev, a){
          
           if(a.related){
               var relation={};
               relation.question=a._id;
             
               relation.answer=a["answer_"+a.type];
                prev.push(relation);
           }
           return prev;
       }, []);

       $uibModalInstance.close($scope.relationship);
   };

   $scope.cancel = function () {
       $uibModalInstance.dismiss('cancel');
   };
};