adminController.CompaniesCtrl = function ($rootScope, $scope, CompanyService) {

    $scope.loading=true;


    $scope.create=function(){
        $rootScope.input("Enter Customer Email: ", "text", "@email.com", function(email){


            $rootScope.input("Enter Customer Password: ", "password","", function(password){
                CustomerService.customer().create({}, {email:email, password:password}, function(result){
                    if(result.error){ $rootScope.error(result.error); return;}

                    $rootScope.companies.unshift(result.customer);

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





    this.ListCompanies=function(){

        CustomerService.customer().list({}, {}, function(result){
            if(result.error){  $rootScope.error(result.error); return;}

            $scope.loading=false;
            $rootScope.companies=result.customers;

            if($scope.companies.length===0){
                $rootScope.warning("Warning! No customers");
            }

        }, function(){

            $rootScope.warning("Server Not Found");

        });

    };








    this.ListCompanies();

};
