define(function() {
	return Backbone.View.extend({
		render: function() {
			$(this.el).html(this.model.get('html'));
			return this;
		},
		events: {
			'mousedown .editable': 'editableClick',
			'keyup': 'change'
		},
		change: function() {
			this.model.set('html', $(this.el).html());
		},
		editableClick: etch.editableInit
	});
});