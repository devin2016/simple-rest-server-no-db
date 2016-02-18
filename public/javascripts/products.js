$(document).ready(function()
{
	Handlebars.registerHelper("tagId", function(product_name)
	{
		return product_name.split(" ").join("_");
	});
	
	// GET all the products at initial page load.
	$.get(
		"/Products", 
				function(result)
				{
					var template = Handlebars.compile($("#template").html());
					
					var test = template(result);
					
					$("#allProducts").append(test);
				},
		"json" 
	);

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
						//wrapped the server response in array to resolve templating error
						var wrapped = [];
						var template = Handlebars.compile($("#template").html());
						wrapped.push(response);
						$("#allProducts").append(template(wrapped));
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
					$(this).hide();
				else $(this).show();
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
					$("#" + e.target.id).parent().parent().remove();
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
		console.log("Got an Error");
	}	
});