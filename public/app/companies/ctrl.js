adminController.CompaniesCtrl = function ($rootScope, $scope, CompanyService, $uibModal) {

    $scope.loading=true;


    $scope.createCompany=function(category){


        $rootScope.input("Enter Company CIF: ", "text", "B000000", function(cif){
            $rootScope.input("Enter Company Name: ", "text", "Peluquería Loquita", function(name){
                $rootScope.input("Enter Company Email: ", "text", "@email.com", function(email){
                    $rootScope.input("Enter Company Password: ", "password","", function(password){

                        CompanyService.company().create({}, {email:email, name:name,password:password, cif:cif, category:category}, function(result){
                            if(result.error){ $rootScope.error(result.error.message); return;}

                            $rootScope.companies.unshift(result.company);

                            $rootScope.success("Company Created!");

                        }, function(){

                            $rootScope.warning("Server Not Found");

                        });
                    });
                });
            });
        });
    };

    $scope.create=function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/company/main.html',
            controller: 'CompanyModalCtrl',
            size:"sm"

        });

        modalInstance.result.then(function (item) {

            $scope.createCompany(item);

        }, function () {

        });

    };


    $scope.save=function(company){


        CompanyService.company().update({id:company._id}, company, function(result){
            if(result.error){ $rootScope.error(result.error.message); return;}
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

    $scope.updateLocation=function(company, index){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/location/main.html',
            controller: 'LocationCtrl',
            size:'lg',
            resolve: {
                items: function () {

                    return company.locations[index];
                }
            }

        });

        modalInstance.result.then(function (item) {
            company.locations[index]=item;
            $rootScope.success("Location Updated!");

        }, function () {

        });

    };
    $scope.deleteLocation=function(company, index){

        company.locations.splice(index, 1);
        $rootScope.success("Location Deleted!");
    };

    $scope.deletePhone=function(company, index){
        company.phone.splice(index, 1);
    };
    $scope.deleteEmail=function(company, index){
        company.emailSecond.splice(index, 1);
    };

    $scope.changeCategory=function(company){
        company.category_metadata= _.find($scope.categories, function(obj) { return obj._id == company.category; });
    };

    $scope.createService=function(company){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/service/main.html',
            controller: 'ServiceCtrl',
            resolve: {
                items: function () {

                    return {};
                }
            }

        });

        modalInstance.result.then(function (item) {

            company.services.push(item);
            $rootScope.success("Service Created!");

        }, function () {

        });
    };

    $scope.updateService=function(company, index){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/service/main.html',
            controller: 'ServiceCtrl',
            resolve: {
                items: function () {

                    return company.services[index];
                }
            }

        });

        modalInstance.result.then(function (item) {

            company.services[index]=item;
            $rootScope.success("Service Updated!");

        }, function () {

        });
    };


    $scope.deleteService=function(company, index){

        company.services.splice(index, 1);
        $rootScope.success("Service Deleted!");
    };

    $scope.deleteImage=function(company, index){
        company.images.splice(index, 1);
        $rootScope.success("Image Deleted!");
    };


    $rootScope.ListCategories();
    $rootScope.ListServices();

    this.ListCompanies();

};
