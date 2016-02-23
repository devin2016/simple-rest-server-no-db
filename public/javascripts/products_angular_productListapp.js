var app = angular.module("ProductListApp", []);

	var controllers = {};

	controllers.SimpleController = function($scope)
	{
			console.log("simple controller called");
					// GET all the products at initial page load.
					$.get(
						"/Products", 
							function(response)
							{
								//ng-init for initial data load
								$scope.$apply(function(){
									$scope.ng_products = response;
								});
								$("#allProducts").show();
							},
						"json" 
					);
	};

	app.controller(controllers);