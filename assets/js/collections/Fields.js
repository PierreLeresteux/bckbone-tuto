define(['models/Field'], function(Field) {
	return Backbone.Collection.extend({
		model: Field
	});
});