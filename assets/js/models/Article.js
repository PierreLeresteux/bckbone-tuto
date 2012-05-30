define(function() {
	return Backbone.Model.extend({
		initialize: function(title, body, category){
			console.log("Article - initialize");
		},
		defaults: function() {
			return {
				title: '',
				body: '',
				category: ''
			};
		},
		clear: function() {
			console.log("Article - clear");
	      	this.destroy();
	    }
    });
});