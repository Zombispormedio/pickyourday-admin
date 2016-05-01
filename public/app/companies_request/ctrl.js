adminController.CompaniesRequestCtrl = function ($rootScope, $scope, CompanyService, $uibModal) {

    $scope.loading=true;



    $scope.acceptCompany=function(company){

        company.state ="active";
        CompanyService.company().update({id:company._id}, company, function(result){
            if(result.error){ $rootScope.error(result.error.message); return console.log(result.error);}
            company.editable=false;
            $rootScope.success("Accepted!");
                fetch();


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
               fetch();

        }, function(){

            $rootScope.warning("Server Not Found");

        });
    };
    
    
      $scope.page={
        totalItems:0,
        current:1,
        sizeItems:5,
        size:4

    }
    $scope.searchObject={
        request:true,
        state:"pending"
    }

    var query= {p:$scope.page.current-1, s:$scope.page.sizeItems,  state:"pending"};

    $scope.changePagination=function(){
        query.p=$scope.page.current-1;
        query.s=$scope.page.sizeItems;
        fetch();
    }

    $scope.searchByText=function(){
        query.search_text=$scope.searchObject.text;
        if(query.search_text!==""){
              fetch();
        }else{
            delete query.search_text;
        }
      
    };
    $scope.openFilterModal=function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/company-filter/main.html',
            controller: 'CompanyFilterModalCtrl',
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
            
     
            var pick_query=_.omit(query, ["name", "email", "cif", 
                                          "phone", "category", "service", 
                                          "keywords_seq",
                                          "country", "province","city","zipcode","address",
                                          'fromRegister','toRegister',
                                          'fromLastUpdate','toLastUpdate']);
        
            query=_.merge(pick_query, filter_query);
           

            fetch();

        });

    };


    var ListCompanies=function(query){
        query=query||{};
       

        CompanyService.count().get(query, function(res){
            $scope.page.totalItems=res.data;

        })
        CompanyService.company().list(query, function(result){
            if(result.error){  $rootScope.error(result.error); return;}

            $scope.loading=false;
            $rootScope.companiesRequest=result.data;



        }, function(){

            $rootScope.warning("Server Not Found");

        });


    };


    $rootScope.ListCategories();
    $rootScope.ListServices();

    var fetch =function(){
        ListCompanies(query);
    }

    fetch();
}