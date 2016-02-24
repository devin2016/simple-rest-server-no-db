var app = angular.module("ProductListApp", []);

var controllers = {};

	controllers.SimpleController = function($scope, $http) 
	{
		$http.get("/Products").then(function(response) 
		{
			$scope.ng_products = response.data;
			$("#allProducts").show();
		});
	};
	
	app.controller(controllers);