define(['js/router/Routes.js'], 
    function(Routes) {
    return {
        initialize: function() {
        	
        	var route = new Routes;
			Backbone.history.start();
        	
        }
    };
});