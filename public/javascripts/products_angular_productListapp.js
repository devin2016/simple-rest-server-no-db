var app = angular.module("ProductListApp", []);

var controllers = {};

	controllers.SimpleController = function($scope, $http) 
	{
		$http.get("/Products").then(function(response) 
		{
			$scope.ng_products = response.data;
			document.getElementById("allProducts").style.display = "block";
		});
		
		$scope.addItem = function(item)
		{
			$http.post("/Products", item)
				.success(function(response){
					$scope.ng_products.push(response);
				});
		};
		
		$scope.removeItem = function(id)
		{
			$http.delete("/Products/" + id)
				.success(function(){
					$scope.ng_products.splice(id-1, 1);
				});
		}
	};
	
	app.controller(controllers);