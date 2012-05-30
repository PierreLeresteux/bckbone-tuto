require([ "order!js/lib/jquery-1.7.1.min.js",
		  "order!js/lib/jquery-ui-1.8.18.min.js",
		  "order!js/lib/underscore-1.3.1.min.js",
		  "order!js/lib/backbone-0.9.2.min.js",
		  "order!js/lib/backbone.localstorage.js",
		  "order!js/lib/handlebars.js"],
			function() {
				require([ "build",
						"text!templates/articleTemplate.html"], 
						  function(build, t) {
							build.initialize();
				});
			});
