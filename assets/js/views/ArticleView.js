define(function() {
	return Backbone.View.extend({
		initialize: function(model) {
			console.log("init articleView "+JSON.stringify(model));
			this.model = model;
			var view = this;
			require(["text!templates/articleTemplate.html" ], function(t) {
				view.template = t;
			});
		},
		render: function() {
			var line = $(this.template).find('#article').html();
			var template = Handlebars.compile(line);
			$(this.el).html(template(this.model));
			return this;
		},
		publish: function(event) {
			console.log("Publish");
			var title = $(this.el).find('input[name=title]').val();
			var body = $(this.el).find('textarea[name=body]').val();
			var category = $(this.el).find('select[name=category]').val();
			console.log("Title : "+title);
			console.log("Body : "+body);
			console.log("Category : "+category);
			new ArticleView(title,body,category);
			event.preventDefault();
		}
	});
});