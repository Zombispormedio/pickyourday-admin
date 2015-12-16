adminCtrl.TabCtrl = function ($rootScope, $scope, $http) {

	$scope.logout = function () {
		$http.get("https://pickyourday.herokuapp.com/api/oauth/logout").then(function successCallback(response) {
			deleteLocal("user");
			$rootScope.go("login");
		}, function errorCallback(response) {

		});
	}
}