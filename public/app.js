var adminController = {};
var adminFactory = {};
var adminFilter = {};
var adminDirective = {};

var app = angular.module('myAdmin', ['ui.router', "ngResource", 'ui.bootstrap', 'contenteditable', 'ngAnimate', 'ngMap', 'colorpicker.module', 'naif.base64'])
.controller(adminController)
.factory(adminFactory)
.filter(adminFilter)
.directive(adminDirective)

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {


    $stateProvider
        .state("login", {
        url: "/login",
        onEnter: function ($rootScope) {
            if (getJSONLocal("user")) {

                $rootScope.go("app");
            }
        },
        templateUrl: 'app/login/main.html',
        controller: 'LoginCtrl'

    })
        .state("app", {
        url: '/',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        templateUrl: 'app/main.html',
        controller: 'TabCtrl'
    })
        .state("app.categories", {
        url: "categories",
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {
                $rootScope.go("login");
            }
        },
        views: {
            'categories': {
                templateUrl: 'app/categories/main.html',
                controller:"CategoriesCtrl"
            }
        }
    })
        .state("app.services", {
        url: "services",
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {
                $rootScope.go("login");
            }
        },
        views: {
            'services': {
                templateUrl: 'app/services/main.html',
                controller:"ServicesCtrl"
            }
        }
    })
        .state("app.customers", {
        url: "customers",
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {
                $rootScope.go("login");
            }
        },
        views: {
            'customers': {
                templateUrl: 'app/customers/main.html',
                controller:"CustomersCtrl"
            }
        }
    })
        .state("app.companies", {
        url: "companies",
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {
                $rootScope.go("login");
            }
        },
        views: {
            'companies': {
                templateUrl: 'app/companies/main.html',
                controller:"CompaniesCtrl"
            }
        }
    })

        .state("app.companiesRequest", {
        url: "companies-pending",
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {
                $rootScope.go("login");
            }
        },
        views: {
            'companiesRequest': {
                templateUrl: 'app/companies_request/main.html',
                controller:"CompaniesRequestCtrl"
            }
        }
    })


        .state("app.picks", {
        url: "picks",
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {
                $rootScope.go("login");
            }
        },
        views: {
            'picks': {
                templateUrl: 'app/picks/main.html',
                controller:"PickCtrl"
            }
        }
    })

        .state("app.preferences", {
        url: "preferences",
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {
                $rootScope.go("login");
            }
        },
        views: {
            'preferences': {
                templateUrl: 'app/preferences/main.html',
                controller:"PreferencesCtrl"
            }
        }
    });







    $urlRouterProvider.otherwise("/login");
    $httpProvider.interceptors.push('AuthInterceptor');

})

.run(function ($rootScope, $state, SystemService) {

    $rootScope.go = function (state, params) {
        $state.go(state, params);
    };

    $rootScope.success=function(message){
        notie.alert(1, message, 1.5);
    };

    $rootScope.error=function(message){
        if(typeof message==="object")message=JSON.stringify(message);
        notie.alert(3, message, 2.5);
    };

    $rootScope.warning=function(message){
        if(typeof message==="object")message=JSON.stringify(message);

        notie.alert(2, message, 2);
    };

    $rootScope.confirm=function(message, cb){
        notie.confirm(message, 'Yes', 'Cancel', function() {
            cb();
        });
    };

    $rootScope.input=function(message, type, placeholder, cb){
        notie.input(message, 'Submit', 'Cancel', type, placeholder, cb);
    };



    $rootScope.ListCategories=function(){

        SystemService.categories().list({}, {}, function(result){
            if(result.error){  $rootScope.error(result.error); return;}

            $rootScope.categories=result.data;

            if($rootScope.categories.length===0){
                $rootScope.warning("Warning! No categories");
            }

        }, function(){

            $rootScope.warning("Server Not Found");

        });

    };



    $rootScope.ListServices=function(){

        SystemService.default_services().list({}, {}, function(result){
            if(result.error){  $rootScope.error(result.error); return;}

            $rootScope.services=result.data;

            if($rootScope.services.length===0){
                $rootScope.warning("Warning! No Services");
            }

        }, function(){

            $rootScope.warning("Server Not Found");

        });

    };

    if(getJSONLocal("user")){
        $rootScope.ListCategories();
        $rootScope.ListServices();
    }


    $rootScope.noimage="https://8549c43475562a0521ba166a16fdb7de6ce65077.googledrive.com/host/0B-TPTaV5ouD7TUtDXzVxQmhYa1E/noimage.png";









});
