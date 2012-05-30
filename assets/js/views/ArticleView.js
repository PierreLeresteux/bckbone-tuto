define(function() {
	return Backbone.View.extend({
		initialize: function(model) {
			this.model = model;
			var view = this;
			require(["text!templates/articleTemplate.html" ], function(t) {
				view.template = t;
			});
		},
		render: function() {
			var line = $(this.template).find('#article').html();
			var template = Handlebars.compile(line);
			$(this.el).html(template(this.model.toJSON()));
			return this;
		},
		publish: function(event) {
			console.log("Publish");
			var title = $(this.el).find('input[name=title]').val();
			var body = $(this.el).find('textarea[name=body]').val();
			var category = $(this.el).find('select[name=category]').val();
			new ArticleView(title,body,category);
			event.preventDefault();
		}
	});
});