define(['collections/Articles','views/ArticleView','views/FilterView','models/Article'],function(Articles,ArticleView,FilterView,Article) {
	return Backbone.View.extend({
		initialize: function() {
			console.log("BlogView-init");
			var view = this;
			require(["text!templates/articleTemplate.html" ], function(t) {
				view.template = t;
			});
			this.articles = new Articles;
			this.articles.comparator = function(article) {
			  return -article.get("creationDate");
			};
			this.articles.bind('reset', this.addAllArticles, this);
		},
		render: function() {
			console.log("BlogView-render");
			var line = $(this.template).find('#blog').html();
			var template = Handlebars.compile(line);
			$(this.el).empty().append(template());
			this.addFilter();
			return this;
		},
		load: function() {
			console.log("BlogView-load");
			this.articles.fetch(); // ->reset
		},
		addFilter: function(event) {
			console.log("BlogView-addFilter");
			var filterView = new FilterView({"blogView":this});
			this.$('#filter').empty().append(filterView.render().el);
		},
		deletArticle: function(event) {
			console.log("BlogView-deleteArticle");
			var target = event.target ? event.target : event.srcElement;
			var articleContainer = $(target).parent().parent();
			var articleId = articleContainer.attr('id');
			
			var article = this.articles.get(articleId);
			this.articles.remove(article);
		},
		addArticle: function(event) {
			console.log("BlogView-addArticle");
			var view = new ArticleView(event);
			this.$('#blogarticles').append(view.render().el);
		},
		addAllArticles: function(event) {
			console.log("BlogView-addAllArticles");
			this.articles.each(this.addArticle);
		},
		changeFilter: function(event) {
			console.log("BlogView-changeFilter");
			var view = this;
			this.$('#blogarticles').empty();
			var filterArticle = event.collection;
			_.each(filterArticle,function(article){
				var articleModel = new Article(article);
				view.addArticle(articleModel);
			});
		}
	});
});