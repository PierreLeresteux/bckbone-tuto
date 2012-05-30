define(['views/ArticleView','models/Article'],function(ArticleView,Article) {
	return Backbone.View.extend({
		initialize: function(param) {
			this.articles = param.collection;
			console.log("init new-article " + JSON.stringify(this.articles));
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
			var article = new Article({"title":title,"body":body,"category":category});
			console.log("article created :"+JSON.stringify(article));
			this.articles.add(article);
		}
	});
});