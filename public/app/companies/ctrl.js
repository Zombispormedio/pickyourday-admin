adminController.CompaniesCtrl = function ($rootScope, $scope, CompanyService) {

    $scope.loading=true;


    $scope.create=function(){

        $rootScope.input("Enter Company CIF: ", "text", "B000000", function(cif){
        $rootScope.input("Enter Company Email: ", "text", "@email.com", function(email){
            $rootScope.input("Enter Company Password: ", "password","", function(password){

                CompanyService.company().create({}, {email:email, password:password, cif:cif}, function(result){
                    if(result.error){ $rootScope.error(result.error); return;}

                    $rootScope.companies.unshift(result.customer);

                    $rootScope.success("Company Created!");

                }, function(){

                    $rootScope.warning("Server Not Found");

                });
            });

        });
        });
    };


    $scope.save=function(company){


        CompanyService.company().update({id:company._id}, company, function(result){
            if(result.error){ $rootScope.error(result.error); return;}
            company.editable=false;
            $rootScope.success("Saved!");

        }, function(){

            $rootScope.warning("Server Not Found");

        });
    };


    $scope.delete=function(company, index){
        $rootScope.confirm("Are you sure?", function(){

            CompanyService.company().delete({id:company._id}, {}, function(result){
                if(result.error){ $rootScope.error(result.error); return;}

                $rootScope.companies.splice(index, 1);

                $rootScope.success("Deleted!");

            }, function(){

                $rootScope.warning("Server Not Found");

            });


        });
    };





    this.ListCompanies=function(){

        CompanyService.company().list({}, {}, function(result){
            if(result.error){  $rootScope.error(result.error); return;}

            $scope.loading=false;
            $rootScope.companies=result.companies;

            if($rootScope.companies.length===0){
                $rootScope.warning("Warning! No customers");
            }

        }, function(){

            $rootScope.warning("Server Not Found");

        });

    };








    this.ListCompanies();

};
