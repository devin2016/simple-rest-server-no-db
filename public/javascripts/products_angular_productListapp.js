var app = angular.module("ProductListApp", []);

var controllers = {};

	controllers.SimpleController = function($scope, $http) 
	{
		$http.get("/Products").then(function(response) 
		{
			$scope.ng_products = response.data;
			document.body.style.display = "block";
		});
		
		$scope.addItem = function(item)
		{
			if(item.product_name != "" && item.product_description != "" && item.product_price != "")
			$http.post("/Products", item)
				.success(function(response){
					$scope.ng_products.push(response);
				});
		};
		
		$scope.removeItem = function(id)
		{
			$http.delete("/Products/" + id)
				.success(function(){
					var filteredScope = $scope.ng_products.filter(function (element) { 
						return element.id != id;
					});
					
					$scope.ng_products = filteredScope;
				});
		};
	};
	
	app.controller(controllers);