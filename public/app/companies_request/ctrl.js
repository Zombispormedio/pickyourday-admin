adminController.CompaniesRequestCtrl = function ($rootScope, $scope, CompanyService, $uibModal) {
    
 	$scope.loading=true;
var self = this;
    this.ListCompanies=function(){

        CompanyService.company().list({state:"demo"}, {}, function(result){
            if(result.error){  $rootScope.error(result.error); return;}
            console.log(result.data);
            $scope.loading=false;
            $rootScope.companiesRequest=result.data;

            if($rootScope.companiesRequest.length===0){
                $rootScope.warning("Warning! No companies");
            }

        }, function(){

            $rootScope.warning("Server Not Found");

        });

    };

    $scope.acceptCompany=function(company){
    	
    	company.state ="active";
        CompanyService.company().update({id:company._id}, company, function(result){
            if(result.error){ $rootScope.error(result.error.message); return console.log(result.error);}
            company.editable=false;
            $rootScope.success("Accepted!");
            self.ListCompanies();


        }, function(){

            $rootScope.warning("Server Not Found");

        });
    };

    $scope.refuseCompany=function(company){
    	company.state ="refused";
        CompanyService.company().update({id:company._id}, company, function(result){
            if(result.error){ $rootScope.error(result.error.message); return console.log(result.error);}
            company.editable=false;
            $rootScope.success("Refused!");
            self.ListCompanies();

        }, function(){

            $rootScope.warning("Server Not Found");

        });
    };


    this.ListCompanies();
}