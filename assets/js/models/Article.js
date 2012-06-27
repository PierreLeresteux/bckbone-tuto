define(function() {
	return Backbone.Model.extend({
		initialize: function(title, body, category){
			console.log("Article - initialize");
			this.on('remove', function(){
				console.log("Article-destroy");
				this.destroy();
			});
		},
		defaults: function() {
			return {
				title: '',
				body: '',
				category: '',
				creationDate: ''
			};
		}
    });
});