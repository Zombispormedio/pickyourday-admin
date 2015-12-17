var adminController = {};
var adminFactory = {};
var adminFilter = {};
var adminDirective = {};

var app = angular.module('myAdmin', ['ui.router', "ngResource"])
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


        $urlRouterProvider.otherwise("/login");
        $httpProvider.interceptors.push('AuthInterceptor');

    })

    .run(function ($rootScope, $state) {

        $rootScope.go = function (state, params) {
            $state.go(state, params);
        }






    });
