define(function() {
	return Backbone.Model.extend({
		defaults: function() {
			return {
				label: 'Label',
				required: false,
				type: 'undefined'
			};
		}
    });
});