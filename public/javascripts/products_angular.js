$(document).ready(function($scope)
{
	// Add new product to db and append to the page.
	$("#addItems").submit(function(e)
	{  
		formData = 
		{ 
			 product_name: $("#item_name").val(),
			 product_description: $("#item_description").val(),
			 product_price: $("#item_price").val(),
		};

		$.ajax({
			url: "/Products",

			type: "post",
			
			data: formData,

			error: errorFn,
			
			success: function(response)
					{
						var update = angular.element($("#allProducts")).scope();
						update.$apply(function(){
							if(update.ng_products.length > 0)
								update.ng_products.push(response);
							else update.ng_products = [].push(response);
							
						});
					},
			complete: function()
					{
						console.log("The request is complete. New product added"); 
					}
		});
		
		e.preventDefault();
	});

	$("#item-search").on("keyup", function(){
			var temp = $(this).val().toLowerCase();
			var search = ".products";
	
			$(search).each(function(){
				var match = $(this).find("h3").html().toLowerCase();
		
				if(match.startsWith(temp) == false)
				{
					$(this).fadeOut(100);
				}	
				else $(this).fadeIn(100);
			});
	});
	
	$("#allProducts").on("click", function(e){
		if(e.target.className.toLowerCase().indexOf("glyphicon-remove-sign") >= 0)
		{
			var server = "/Products/" + e.target.id.split("_")[1];
			$.ajax({
				url: server,

				type: "DELETE",
			
				error: errorFn,
				
				success: function(){ console.log("Item deleted");},
				
				complete: function()
				{ 
					var $targ = $("#" + e.target.id).closest(".products");
					$targ.fadeOut(100, function(){
						$(this).remove();
					});	
				}
			});			
		}
	});
	
	$("input").on("focus", function(){
		$(this).val("");
	});
	
	$("input").on("blur", function(){
		if($(this).val()=="")
			$(this).val($(this).prev().html());
	});	
	
	function errorFn(xhr, status, strErr)
	{
		console.log("Got an Error in AJAX");
	}	
});