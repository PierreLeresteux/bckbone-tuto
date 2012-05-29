define(['views/ArticleView'],function(ArticleView) {
	return Backbone.View.extend({
		initialize: function() {
			console.log("init new-article");
			var view = this;
			require(["text!templates/articleTemplate.html" ], function(t) {
				view.template = t;
			});
		},
		events: {
			'click .btn': 'publish'
		},
		render: function() {

			var line = $(this.template).find('#new-article').html();
				
			var template = Handlebars.compile(line);
			$(this.el).html(template());
			return this;
		},
		publish: function(event) {
			event.preventDefault();
			console.log("Publish");
			var title = $(this.el).find('input[name=title]').val();
			var body = $(this.el).find('textarea[name=body]').val();
			var category = $(this.el).find('select[name=category]').val();
			console.log("Title : "+title);
			console.log("Body : "+body);
			console.log("Category : "+category);
		}
	});
});