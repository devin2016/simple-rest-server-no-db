$(document).ready(function()
{
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
			
			success: successFn,

			complete: function()
					  {
						console.log("The request is complete. Getting all products next");
						  $.get(
							"/Products", 
									function(result)
									{
										//--------------------------------------------------------
										Handlebars.registerHelper("productId", function(product_name)
										{
											return product_name.split(" ").join("_");
										});
										var template = Handlebars.compile($("#template").html());
										
										var test = template(result);
										
										$("#allProducts").empty().append(test);
										//--------------------------------------------------------
									},
							"json" 
							);
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
					$(this).hide();
				else $(this).show();
			});
	});
	
	$("input").on("focus", function(){
		$(this).val("");
	});
	$("input").on("blur", function(){
		if($(this).val()=="")
			$(this).val($(this).prev().html());
	});
	
	function successFn(response)
	{
		console.log("New item added to DB");
	}
	
	function errorFn(xhr, status, strErr)
	{
		console.log("Got an Error");
	}	
});