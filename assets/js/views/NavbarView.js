define(function() {
	return Backbone.View.extend({
		el: '#editorContentPanel',
		initialize: function() {
			require(["text!templates/tutotemplate.html" ], function(template) {
				view.template = template;
			});
		},
		render: function() {
			var source = $(this.template).find('navbar').html();
			var template = Handlebars.compile(source);

			$(this.el).html(template());
			return this;
		});
});