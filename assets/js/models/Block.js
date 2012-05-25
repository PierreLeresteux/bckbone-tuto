define(function() {
	return Backbone.Model.extend({
		defaults: function() {
			return {
				size: 12,
				type: 'text',
				html: ''
			};
		},
		initialize: function(){
			this.bind("remove", function() {
				this.destroy();
			});
		}
    });
});