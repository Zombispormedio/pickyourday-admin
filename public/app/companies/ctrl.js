adminController.CompaniesCtrl = function ($rootScope, $scope, CompanyService, $uibModal) {

    $scope.loading=true;

    var self = this;
    $scope.createCompany=function(category){


        $rootScope.input("Enter Company CIF: ", "text", "B000000", function(cif){
            $rootScope.input("Enter Company Name: ", "text", "Peluquería Loquita", function(name){
                $rootScope.input("Enter Company Email: ", "text", "@email.com", function(email){
                    $rootScope.input("Enter Company Password: ", "password","", function(password){

                        CompanyService.company().create({}, {email:email, name:name,password:password, cif:cif, category:category}, function(result){
                            if(result.error){ $rootScope.error(result.error.message); return;}

                            fetch();s

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
            if(result.error){ $rootScope.error(result.error.message); return console.log(result.error);}
            company.editable=false;
            $rootScope.success("Saved!");

        }, function(){

            $rootScope.warning("Server Not Found");

        });
    };

    $scope.demoCompany=function(company, index){

        company.state ="demo";
        CompanyService.company().update({id:company._id}, company, function(result){
            if(result.error){ $rootScope.error(result.error.message); return console.log(result.error);}
            company.editable=false;
            $rootScope.success("State changed!");
            self.ListCompanies();


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


    $scope.delete=function(company, index){
        $rootScope.confirm("Are you sure?", function(){

            CompanyService.company().delete({id:company._id}, {}, function(result){
                if(result.error){ $rootScope.error(result.error); return;}

                fetch();

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

            company.location=item;

        }, function () {

        });
    };

    $scope.updateLocation=function(company){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/location/main.html',
            controller: 'LocationCtrl',
            size:'lg',
            resolve: {
                items: function () {

                    return company.location;
                }
            }

        });

        modalInstance.result.then(function (item) {
            company.location=item;
            $rootScope.success("Location Updated!");

        }, function () {

        });

    };
    $scope.deleteLocation=function(company){

        delete company.location;
        $rootScope.success("Location Deleted!");
    };

    $scope.deletePhone=function(company, index){
        company.phone.splice(index, 1);
    };
    $scope.deleteEmail=function(company, index){
        company.emailSecond.splice(index, 1);
    };



    $scope.createService=function(company){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/service/main.html',
            controller: 'ServiceCtrl',
            resolve: {
                items: function () {

                    return {service: {},category:company.category};
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

                    return {service:company.services[index], category:company.category};
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


    $scope.page={
        totalItems:0,
        current:1,
        sizeItems:5,
        size:4

    }
    $scope.searchObject={

    }

    var query= {p:$scope.page.current-1, s:$scope.page.sizeItems};

    $scope.changePagination=function(){
        query.p=$scope.page.current-1;
        query.s=$scope.page.sizeItems;
        fetch();
    }

    $scope.searchByText=function(){
        query.search_text=$scope.searchObject.text;
        if(query.search_text===""){
            delete query.search_text;
        }
        fetch();
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
                                          "state", "keywords_seq",
                                          "country", "province","city","zipcode","address",
                                          'afterRegister','beforeRegister','afterLastUpdate','beforeLastUpdate',
                                          "id", "premium", "other_emails",
                                          'toDateExpire','fromDateExpire', 'toDatePayment', 'fromDatePayment', 
                                          "promotion_id", "promotion_name", "promotion_services", 'promotion_state',
                                          'promotion_to_initDate', 'promotion_from_initDate', 'promotion_to_endDate','promotion_from_endDate','promotion_to_dateCreated','promotion_from_dateCreated', 'service_name',"service_id",
                                          'service_to_price','service_from_price',
                                          'service_to_duration','service_from_duration',
                                          'service_to_dateCreated','service_from_dateCreated',
                                          'service_review_to_rating','service_review_from_rating',
                                          'service_review_to_date','service_review_from_date',
                                          'review_to_rating','review_from_rating','review_to_date','review_from_date',
                                          "resource_services","resource_id","resource_name","resource_surname",
                                          'resource_to_initDate','resource_from_initDate']);

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
            $rootScope.companies=result.data;


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

};
