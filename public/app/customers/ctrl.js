adminController.CustomersCtrl = function ($rootScope, $scope, CustomerService) {

    $scope.loading=true;


    $scope.create=function(){
        $rootScope.input("Enter Customer Email: ", "text", "@email.com", function(value){


            CustomerService.categories().create({}, {name:value}, function(result){
                if(result.error){ $rootScope.error(result.error); return;}

                $scope.categories.unshift(result.customer);

                $rootScope.success("Customer Created!");

            }, function(){

                $rootScope.warning("Server Not Found");

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

                $scope.customers.splice(index, 1);

                $rootScope.success("Deleted!");

            }, function(){

                $rootScope.warning("Server Not Found");

            });


        });
    };





    this.ListCustomers=function(){

        CustomerService.customer().list({}, {}, function(result){
            if(result.error){  $rootScope.error(result.error); return;}

            $scope.loading=false;
            $scope.customers=result.customers;

            if($scope.customers.length===0){
                $rootScope.warning("Warning! No customers");
            }

        }, function(){

            $rootScope.warning("Server Not Found");

        });

    };








    this.ListCustomers();

};
