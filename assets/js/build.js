define(['router/Routes'], 
    function(Routes) {
    return {
        initialize: function() {
        	
        	var route = new Routes;
			Backbone.history.start();
        	
        }
    };
});