define(['collections/Articles','views/NewArticleView','views/ArticleView'],function(Articles,NewArticleView,ArticleView) {
	return Backbone.View.extend({
		initialize: function() {
			console.log("init blog");
			var view = this;
			require(["text!templates/articleTemplate.html" ], function(t) {
				view.template = t;
			});
			this.articles = new Articles;
			this.articles.on("add", this.addArticle, this);
		},
		render: function() {
			var line = $(this.template).find('#blog').html();
			var template = Handlebars.compile(line);
			$(this.el).html(template());
			this.addNewArticle();
			return this;
		},
		addNewArticle: function() {
			var newArticle = new NewArticleView({"collection":this.articles});
        	var renderNewArticle = newArticle.render();
        	$(this.el).find('#newarticle').html(renderNewArticle.el);
		},
		addArticle: function(event) {
			console.log("addArticle Event" + JSON.stringify(event));
			$(this.el).find('#blogarticles').append(new ArticleView(event).render().el);
		}

	});
});