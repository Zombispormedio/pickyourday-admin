adminController.CompaniesCtrl = function ($rootScope, $scope, CompanyService, $uibModal) {

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



    $scope.addPhone=function(company){
        if(company.tempPhone!==""){
            company.phone.push(company.tempPhone);
            company.tempPhone="";
        }
    };

    $scope.addEmail=function(company){
        if(company.tempEmail!==""){
            company.emailSecond.push(company.tempEmail);
            company.tempEmail="";
        }
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

    $scope.addImage=function(company){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/image-uploader/main.html',
            controller: 'ImageUploaderCtrl'

        });

        modalInstance.result.then(function (item) {

            company.images.push(item);

        }, function () {

        });
    };


    $scope.dynamicPopover = {
        templateUrl: 'KeywordPopover.html',
        title: "Add Keyword"
    };

    $scope.addTag=function(company){
        company.keywords.push(company.tempTag);
        company.tempTag="";
    };

    $scope.deleteKeyword=function(company, index){
        company.keywords.splice(index, 1);

    };

    $scope.addLocation=function(company){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/location/main.html',
            controller: 'LocationCtrl',
            size:"lg",
            resolve: {
                items: function () {

                    return {};
                }
            }
        });

        modalInstance.result.then(function (item) {

            company.locations.push(item);

        }, function () {

        });
    };






    this.ListCompanies();

};
