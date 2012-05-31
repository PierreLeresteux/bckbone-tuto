define(['collections/Articles','views/ArticleView'],function(Articles,ArticleView) {
	return Backbone.View.extend({
		initialize: function() {
			console.log("BlogView-init");
			var view = this;
			require(["text!templates/articleTemplate.html" ], function(t) {
				view.template = t;
			});
			this.articles = new Articles;
			this.articles.bind('reset', this.addAllArticles, this);
		},
		render: function() {
			console.log("BlogView-render");
			var line = $(this.template).find('#blog').html();
			var template = Handlebars.compile(line);
			$(this.el).html(template());
			return this;
		},
		load: function() {
			console.log("BlogView-load");
			this.articles.fetch(); // ->reset
		},
		deletArticle: function(event) {
			console.log("BlogView-deleteArticle");
			var target = event.target ? event.target : event.srcElement;
			var articleContainer = $(target).parent().parent();
			var articleId = articleContainer.attr('id');
			
			var article = this.articles.get(articleId);
			console.log(JSON.stringify(this.articles));
			this.articles.remove(article);
			console.log(JSON.stringify(this.articles));
		},
		addArticle: function(event) {
			console.log("BlogView-addArticle");
			var view = new ArticleView(event);
			this.$('#blogarticles').append(view.render().el);
		},
		addAllArticles: function(event) {
			console.log("BlogView-addAllArticles");
			this.articles.each(this.addArticle);
		}
	});
});