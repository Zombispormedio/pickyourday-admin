adminController.CustomersCtrl = function ($rootScope, $scope, CustomerService,  $uibModal) {

    $scope.loading=true;


    $scope.create=function(){
        $rootScope.input("Enter Customer Email: ", "text", "@email.com", function(email){


            $rootScope.input("Enter Customer Password: ", "password","", function(password){
               CustomerService.customer().create({}, {email:email, password:password}, function(result){
                   if(result.error){ $rootScope.error(result.error); return;}

                   $rootScope.customers.unshift(result.data);

                   $rootScope.success("Customer Created!");

               }, function(){

                   $rootScope.warning("Server Not Found");

               });
           });

        });
    };


    $scope.save=function(customer){


        CustomerService.customer().update({id:customer._id}, customer, function(result){
            if(result.error){ $rootScope.error(result.error); return;}
            customer.editable=false;
            $rootScope.success("Saved!");

        }, function(){

            $rootScope.warning("Server Not Found");

        });
    };


    $scope.delete=function(customer, index){
        $rootScope.confirm("Are you sure?", function(){

            CustomerService.customer().delete({id:customer._id}, {}, function(result){
                if(result.error){ $rootScope.error(result.error); return;}

                $rootScope.customers.splice(index, 1);

                $rootScope.success("Deleted!");

            }, function(){

                $rootScope.warning("Server Not Found");

            });


        });
    };


    $scope.createEvent = function (customer) {


        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/events/main.html',
            controller: 'EventsCtrl',
            size:'lg',
            resolve: {
                items: function () {

                    return {};
                }
            }

        });

        modalInstance.result.then(function (item) {

            customer.events.push(item);
            $rootScope.success("Event Created!");

        }, function () {

        });
    };


    $scope.updateEvent=function(customer, index){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/events/main.html',
            controller: 'EventsCtrl',
            size:'lg',
            resolve: {
                items: function () {

                    return customer.events[index];
                }
            }

        });

        modalInstance.result.then(function (item) {
            customer.events[index]=item;
            $rootScope.success("Event Updated!");

        }, function () {

        });

    };
    $scope.deleteEvent=function(customer, index){

      customer.events.splice(index, 1);
        $rootScope.success("Event Deleted!");
    };



    this.ListCustomers=function(){

        CustomerService.customer().list({}, {}, function(result){
            if(result.error){  $rootScope.error(result.error); return;}

            $scope.loading=false;
            $rootScope.customers=result.data;

            if($rootScope.customers.length===0){
                $rootScope.warning("Warning! No customers");
            }

        }, function(){

            $rootScope.warning("Server Not Found");

        });

    };








    this.ListCustomers();

};
