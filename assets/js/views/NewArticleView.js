define(['views/ArticleView','models/Article'],function(ArticleView,Article) {
	return Backbone.View.extend({
		initialize: function(param) {
			console.log("NewArticleView-init");
			this.articles = param.collection;
			var view = this;
			require(["text!templates/articleTemplate.html" ], function(t) {
				view.template = t;
			});
		},
		events: {
			'click .btn': 'publish'
		},
		render: function() {
			console.log("NewArticleView-render");
			var line = $(this.template).find('#new-article').html();
				
			var template = Handlebars.compile(line);
			$(this.el).html(template());
			return this;
		},
		publish: function(event) {
			console.log("NewArticleView-publish");
			event.preventDefault();
			console.log("Publish");
			var title = $(this.el).find('input[name=title]').val();
			var body = $(this.el).find('textarea[name=body]').val();
			var category = $(this.el).find('select[name=category]').val();	
			//var article = new Article();
			
			this.articles.create({"title":title,"body":body,"category":category});
			console.log("article created :"+JSON.stringify(this.articles));
		}
	});
});