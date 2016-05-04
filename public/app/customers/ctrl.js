adminController.CustomersCtrl = function ($rootScope, $scope, CustomerService,  $uibModal) {


    $scope.create=function(){
        $rootScope.input("Enter Customer Email: ", "text", "@email.com", function(email){


            $rootScope.input("Enter Customer Password: ", "password","", function(password){
                CustomerService.customer().create({}, {email:email, password:password}, function(result){
                    if(result.error){ $rootScope.error(result.error); return;}

                   fetch();

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

                fetch();

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
    }



    $scope.openFilterModal=function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/customer-filter/main.html',
            controller: 'CustomerFilterModalCtrl',
            size:'lg',
            resolve: {
                items: function () {

                    return $scope.searchObject;
                }
            }

        });

        modalInstance.result.then(function (item) {
            var filter_query=_.transform(item, function(result, value, key) {
                if(value!=void 0&& value!=="")result[key]=value;
            }, {});

            var pick_query=_.omit(query, ["name", "email", "surname", 
                                          'afterBirthDate','beforeBirthDate',
                                          'afterRegister','beforeRegister',
                                          'afterLastUpdate','beforeLastUpdate']);
        
            query=_.merge(pick_query, filter_query);
           

            fetch();

        });

    };



    var ListCustomers=function(query){
        query=query||{};

        CustomerService.count().get(query, function(res){
            $scope.page.totalItems=res.data;

        })


        CustomerService.customer().list(query, function(result){
            if(result.error){  $rootScope.error(result.error); return;}

            $scope.loading=false;
            $rootScope.customers=result.data;

        }, function(){

            $rootScope.warning("Server Not Found");

        });

    };

    var fetch =function(){
        ListCustomers(query);
    }

    fetch();


};
