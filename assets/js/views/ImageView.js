define(function() {
	return Backbone.View.extend({
		events: {
			'click .btn': 'edit',
			'mouseover': 'mouseover',
			'mouseout': 'mouseout'
		},
		edit: function() {
			var url = this.$('img').attr('src');
			var url = prompt($.i18n._('landingpage.url'), url);
			this.$('img').attr('src', url);

			this.removeButtons();
			this.model.set('html', $(this.el).html());
			this.addButtons();
		},
		render: function() {
			$(this.el).html(this.model.get('html'));
			this.addButtons();
			this.mouseout();
			return this;
		},
		mouseover: function() {
			this.$('.buttons').show();
		},
		mouseout: function() {
			this.$('.buttons').hide();
		},
		addButtons: function() {
			var buttons = '<button class="btn btn-small"><i class="icon-cog"></i>{{ i18n "landingpage.edit" }}</button>';
			var template = Handlebars.compile(buttons);
			this.$('.buttons').html(template());
		},
		removeButtons: function() {
			this.$('.buttons').html('');
		}
	});
});